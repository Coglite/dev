import { observable, action, computed, toJS, isObservableArray } from "mobx";
import { IWorkflow,
    IWorkflowStepBase,
    IWorkflowStepSimple,
    IWorkflowStepCompound,
    IHealth,
    IReadiness,
    KeyValueEntry,
    PortEntry,
    StepType,
    Volume,
    HealthType,
    HealthTypes,
    StepTypes,
    ImageSource,
    ImageSources }
    from '../workflow-interfaces';

//import { keysOfIHealth,keysOfIReadiness,keysOfIWorkflowStepSimple} from '../workflow-interfaces';


export interface WorkflowStepPos {
    parent: Workflow | WorkflowStepCompound;
    index: number;
}


export * from '../workflow-interfaces';


export class Workflow implements IWorkflow {
    @observable steps: WorkflowStep[] = [];
    @observable workflowVariables: KeyValueEntry[] = [];
    @observable transient: WorkFlowTransientState = new WorkFlowTransientState();
    
    @observable ignoreFailure?: boolean = false;
    @observable ignoreValidation?: boolean = false;
    @observable ignoreMissing?: boolean = false;

    constructor(workflow?: Partial<IWorkflow>) {
        if (workflow) {
            Object.assign(this, workflow);
        }
    }

    changeStepType(step: WorkflowStep, newStepType: StepType): WorkflowStep {
        let simpleStepTypes: StepType[] = ['sequential', 'service', 'parallel'];
        let newStep: WorkflowStepSimple | WorkflowStepCompound | undefined = undefined;

        if (simpleStepTypes.indexOf(newStepType) > -1) {
            newStep = new WorkflowStepSimple({ name: '' });
        } else if (newStepType === 'compound') {
            newStep = new WorkflowStepCompound({ name: '' });
        }

        if (simpleStepTypes.indexOf(newStepType) > -1 && step.type !== 'compound') {
            Object.assign(newStep as WorkflowStepSimple, step as WorkflowStepSimple, {type: newStepType});
        }

        if (newStep) {
            newStep.name = step.name;

            let stepPos = this.findStep(step);

            if (stepPos) {
                this.deleteStep(step, stepPos);

                stepPos.parent.steps.splice(stepPos.index, 0, newStep);
            }
        }

        return newStep;
    }

    deleteStep(step: WorkflowStepSimple | WorkflowStepCompound, stepPos?: WorkflowStepPos, deleteChildren: boolean = false) {
        stepPos = stepPos || this.findStep(step);

        if (stepPos) {
            stepPos.parent.steps.splice(stepPos.index, 1);

            if (step.type === 'compound' && !deleteChildren) {
                let steps = (step as WorkflowStepCompound).steps;

                stepPos.parent.steps.splice(stepPos.index, 0, ...(steps.map(a => a)));
            }
        }
    }

    findStep(search: WorkflowStep | string | ((_: WorkflowStep) => boolean), parent?: Workflow | WorkflowStepCompound): WorkflowStepPos | undefined {
        parent = parent || this;

        for (var index = 0; index < parent.steps.length; index++) {
            if (this.test(index, search, parent)) {
                return { parent, index };
            }
            else if (parent.steps[index] instanceof WorkflowStepCompound) {
                let childStep = this.findStep(search, (parent.steps[index] as WorkflowStepCompound));
                if (childStep) {
                    return childStep;
                }
            }
        }

        return undefined;
    }

    @computed
    get flattenedStepsSimple() {
        return this.getFlattenedSteps(false);
    }

    @computed
    get flattenedStepsAll() {
        return this.getFlattenedSteps(false);
    }

    stepsBefore(step: WorkflowStepBase) {
        if (step) {
            let previousSteps = [];
            let steps = this.flattenedStepsSimple;

            for (let currentStep of steps) {
                if (currentStep !== step) {
                    previousSteps.push(currentStep);
                } else {
                    break;
                }
            }

            return previousSteps.map(currentStep => ({ label: currentStep.name, value: currentStep.name }));
        }

        return [];
    }

    private getFlattenedSteps(includeCompoundSteps: boolean = false) {
        return this.flattenSteps(this.steps, includeCompoundSteps);
    }

    @action
    moveStep(step: WorkflowStep, index: number, parent: WorkflowStepCompound | Workflow = this) {
        let targetEnd: WorkflowStep = index < parent.steps.length && parent.steps[index];

        this.deleteStep(step, null, true);

        let targetIndex = targetEnd ? parent.steps.indexOf(targetEnd) : parent.steps.length;

        parent.steps.splice(targetIndex, 0, step);
    }

    @action
    addStep() {
        let steps = this.flattenedStepsAll,
            name = 'New step',
            nameCount = 1;

        while (steps.find(step => step.name === name)) {
            nameCount++;
            name = 'New step (' + nameCount + ')';
        }

        this.steps.push(new WorkflowStepSimple({ name }));
    }

    private flattenSteps(steps: WorkflowStep[], includeCompoundSteps: boolean = false) {
        let flatSteps: WorkflowStep[] = [];

        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (step.type === 'compound') {
                if (includeCompoundSteps) {
                    flatSteps.push(step);
                }
                flatSteps = flatSteps.concat(this.flattenSteps((step as WorkflowStepCompound).steps));
            }
            else {
                flatSteps.push(step);
            }
        }

        return flatSteps;
    }

    private test(index: number, test: string | WorkflowStep | ((_: WorkflowStep) => boolean), parent: Workflow | WorkflowStepCompound): boolean {
        if (typeof test === 'string') {
            return parent.steps[index].name === test;
        }
        else if (typeof test === 'function') {
            return test(parent.steps[index]);
        }
        else {
            return parent.steps[index] === test;
        }
    }

    static apply(source: IWorkflow): Workflow {
        let out = Object.assign(new Workflow(), {
            steps: (source.steps || []).map(step => {
                if (step.type === 'compound') return WorkflowStepCompound.apply(step as IWorkflowStepCompound);
                else return WorkflowStepSimple.apply(step as IWorkflowStepSimple);
            })
        });

        tryApply(out, 'workflowVariables', 
            () => out.workflowVariables = source.workflowVariables !== undefined ? cleanKeyValueEntryArray(source.workflowVariables) : [], 
            () => out.workflowVariables = []);
        
        tryApplyPrimitive(out, 'ignoreFailure', source, 'boolean');
        tryApplyPrimitive(out, 'ignoreValidation', source, 'boolean');
        tryApplyPrimitive(out, 'ignoreMissing', source, 'boolean');

        return out;
    }

    toJS (): IWorkflow {
        let out: IWorkflow = {
            steps: this.steps.map(step => step.toJS())
        } 

        if (this.workflowVariables.length) {
            let arr = cleanKeyValueEntryArray(this.workflowVariables);
            if (arr.length) {
                out.workflowVariables = arr;
            }
        }

        if (this.ignoreFailure !== undefined) { out.ignoreFailure = this.ignoreFailure; }
        if (this.ignoreValidation !== undefined) { out.ignoreValidation = this.ignoreValidation; }
        if (this.ignoreMissing !== undefined) { out.ignoreMissing = this.ignoreMissing; }

        return out;
    }
}

export class TransientState {
    @observable parseError: string[] = [];
    @observable errorsDismissed: boolean = false;
}

export class WorkFlowTransientState extends TransientState {
}

export type WorkflowStep = WorkflowStepSimple | WorkflowStepCompound;
export type ActionType = 'script' | 'call' | 'generated' | 'dockerfile';
export type UXImageSourceType = 'manual' | 'catalog' | 'step';

export abstract class WorkflowStepBase implements IWorkflowStepBase {
    @observable name: string = '';
    @observable transient: TransientState = new TransientState();
    readonly type: StepType;

    constructor(step: Partial<WorkflowStepBase>) {
        this.name = step.name;
        Object.assign(this, step);
    }

    static apply(source: IWorkflowStepBase): WorkflowStepBase {
        return Object.assign(Object.create(WorkflowStepBase.prototype), source);
    }
}

export class StepTransientState extends TransientState {
    @observable imageSourceTypeSelected?: UXImageSourceType;

    @observable healthCheckType?: HealthType;
    @observable action?: ActionType;
    @observable healthConfigured: boolean;
    @observable readinessConfigured: boolean;
    @observable readinessCheckType?: HealthType;
    @observable sourceOptions: boolean;
    @observable failureOptions: boolean;
    @observable environmentConfigured: boolean;
    @observable volumesConfigured: boolean;
    @observable portsConfigured: boolean;
    @observable sourceType?: 'dockerignore' | 'includeExclude';


    @observable explicitSourceIncludes: boolean;
    @observable explicitSourceExcludes: boolean;

    @observable explicitIncludeVariables: boolean;
    @observable explicitExcludeVariables: boolean;
}

export class Health implements IHealth {
    @observable type: HealthType = 'http';
    @observable script?: string;
    @observable port?: string;
    @observable path?: string;
    @observable interval?: number;
    @observable timeout?: number;
    @observable retries?: number;
    @observable grace?: number;
    @observable headers?: KeyValueEntry[] = [];

    @observable transient: TransientState = new TransientState();

    constructor(health: Partial<Health>) {
        Object.assign(this, health);
    }

    static apply(source: IHealth): Health {
        let health: Health = Object.assign(new Health({}));

        tryApplyEnum(health, 'type', source, HealthTypes, true, () => health.type = 'http');

        if (health.type === 'script') {
            tryApplyPrimitive(health, 'script', source, 'string');
        }
        else if (health.type === 'tcp') {
            tryApplyPrimitive(health, 'port', source, 'string', false, (value) => typeof value === 'number' ? value.toString(): value);
        }
        else {
            tryApplyPrimitive(health, 'port', source, 'string', false, (value) => typeof value === 'number' ? value.toString(): value);
            tryApplyPrimitive(health, 'path', source, 'string');
            tryApply(health, 'headers', 
                () => health.headers = source.headers !== undefined ? cleanKeyValueEntryArray(source.headers) : [], 
                () => health.headers = []);
        }

        tryApplyPrimitive(health, 'interval', source, 'number');
        tryApplyPrimitive(health, 'timeout', source, 'number');
        tryApplyPrimitive(health, 'retries', source, 'number');
        tryApplyPrimitive(health, 'grace', source, 'number');

        return health;
    }

    filled(): boolean {
        let keys = Object.keys(this);

        for (var i = 0; i < keys.length; i++) {
            if (keys[i] !== 'transient') {
                if (keys[i] === 'headers') {
                    if ((this as any)[keys[i]] && (this as any)[keys[i]].length > 0) {
                        return true;
                    }
                }
                else if (keys[i] !== 'type' && (this as any)[keys[i]] !== undefined) {
                    return true;
                }
            }
        }

        return false;
    }

    toJS(): IHealth {
        if (!this.filled()) {
            return undefined;
        }
        let out = fillObj(toJS(this));
        
        Health.cleanupJSFields(out);
        
        return out;
    }

    static cleanupJSFields (obj: IHealth) {
        if (obj.type === 'script') {
            delete obj.port;
            delete obj.path;
            delete obj.headers;
        }
        else if (obj.type === 'tcp') {
            delete obj.script;
            delete obj.path;
            delete obj.headers;
        }
        else if (obj.type === 'http' || obj.type === 'https') {
            delete obj.script;

            if (obj.headers && obj.headers.length === 0) {
                delete obj.headers;
            }
            else {
                obj.headers = cleanKeyValueEntryArray(obj.headers);
            }
        }
    }
}

export class Readiness extends Health implements IReadiness {
    @observable skipWait?: boolean;

    constructor(readiness: Partial<Readiness>) {
        super(readiness);
        Object.assign(this, readiness);
    }

    static apply(source: IReadiness): Readiness {
        let readiness: Readiness = Object.assign(new Readiness({}), super.apply(source));

        tryApplyPrimitive(readiness, 'skipCheck', source, 'boolean');

        return readiness;
    }

    toJS(): IReadiness {
        if (!this.filled()) {
            return undefined;
        }
        let out = fillObj(toJS(this));

        Health.cleanupJSFields(out);
        
        return out;
    }
}

export class WorkflowStepSimple extends WorkflowStepBase implements IWorkflowStepSimple {
    type: StepType = 'sequential';

    constructor(step: Partial<WorkflowStepSimple>) {
        super(step);
        Object.assign(this, step);
    }

    @observable transient: StepTransientState = new StepTransientState();
    @observable imageSource?: ImageSource = 'image';
    @observable image?: string = '';
    @observable dockerfile?: string = '';
    @observable target?: string = '';
    @observable generator?: string = '';
    @observable script?: string = '';
    @observable omitSource?: boolean = false;
    @observable ignoreFailure?: boolean = false;
    @observable ignoreValidation?: boolean = false;
    @observable ignoreMissing?: boolean = false;
    @observable sourceLocation?: string = '';
    @observable health?: Health = new Health({});
    @observable readiness?: Readiness = new Readiness({});
    @observable environment?: KeyValueEntry[] = [];
    @observable ports?: PortEntry[] = [];
    @observable volumes?: Volume[] = [];
    @observable dockerignore?: string = '';
    @observable sourceIncludes?: string[] = [];
    @observable sourceExcludes?: string[] = [];

    @observable includeVariables?: string[] | string = [];
    @observable excludeVariables?: string[] | string = [];

    static apply(source: IWorkflowStepSimple): WorkflowStepSimple {
        let step: WorkflowStepSimple = Object.assign(new WorkflowStepSimple(source as any));

        tryApply(step, 'health', 
            () => {
                step.health = source.health !== undefined ? Health.apply(source.health) : new Health({});
                if (step.health.transient.parseError.length) {
                    throw Error;
                }
            });
        tryApply(step, 'readiness', 
            () => {
                step.readiness = source.readiness !== undefined ? Readiness.apply(source.readiness) : new Readiness({});
                if (step.readiness.transient.parseError.length) {
                    throw Error;
                }
            });
        tryApply(step, 'environment', 
            () => step.environment = source.environment !== undefined ? cleanKeyValueEntryArray(source.environment) : [], 
            () => {step.environment = [];});
        tryApply(step, 'volumes', 
            () => step.volumes = source.volumes !== undefined ? cleanVolumes(source.volumes) : [], 
            () => step.volumes = []);
        tryApply(step, 'ports', 
            () => step.ports = source.ports !== undefined ? cleanPortEntryArray(source.ports) : [], 
            () => {step.ports = [];});
        

        tryApply(step, 'includeVariables', 
            () => {
                if (source.includeVariables !== undefined) {
                    if (!Array.isArray(source.includeVariables)) {
                        step.includeVariables = [source.includeVariables];
                    }
                    else {
                        step.includeVariables = source.includeVariables;
                    }
                } else {
                    step.includeVariables = ['*'];
                }
                step.transient.explicitIncludeVariables = source.includeVariables !== undefined;
            }, 
            () => step.includeVariables = ['*']);

        tryApply(step, 'excludeVariables', 
            () => {
                if (source.excludeVariables !== undefined) {
                    if (!Array.isArray(source.excludeVariables)) {
                        step.excludeVariables = [source.excludeVariables];
                    }
                    else {
                        step.excludeVariables = source.excludeVariables;
                    }
                } else {
                    step.excludeVariables = [];
                }
                step.transient.explicitExcludeVariables = source.includeVariables !== undefined;
            }, 
            () => step.excludeVariables = []);

        tryApplyPrimitive(step, 'name', source, 'string', false);
        tryApplyEnum(step, 'type', source, StepTypes, false);
        tryApplyEnum(step, 'imageSource', source, ImageSources);

        tryApplyPrimitive(step, 'dockerignore', source, 'string');
        tryApplyPrimitive(step, 'image', source, 'string');
        tryApplyPrimitive(step, 'dockerfile', source, 'string');
        tryApplyPrimitive(step, 'target', source, 'string');
        tryApplyPrimitive(step, 'generator', source, 'string');
        tryApplyPrimitive(step, 'script', source, 'string');
        tryApplyPrimitive(step, 'omitSource', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreFailure', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreValidation', source, 'boolean');
        tryApplyPrimitive(step, 'ignoreMissing', source, 'boolean');
        tryApplyPrimitive(step, 'sourceLocation', source, 'string');

        return step;
    }

    get action() : 'dockerfile' | 'call' | 'generated' | 'script' {
        if (this.transient && this.transient.action) {
            return this.transient.action;
        } else if (this.dockerfile) {
            return 'dockerfile';
        } else if (this.target) {
            return 'call';
        } else if (this.generator) {
            return 'generated';
        }

        return 'script';
    }

    toJS(): IWorkflowStepSimple {
        let out: IWorkflowStepSimple = fillObj(toJS(this));

        if (out.type === 'service') {
            let health = this.health.toJS();
            health ? out.health = health : delete out.health;

            let readiness = this.readiness.toJS();
            readiness ? out.readiness = readiness : delete out.readiness;
        } else {
            delete out.health;
            delete out.readiness;
        }

        if (out.type === 'sequential') {
            delete out.type;
        }

        if (this.action !== 'script' && this.action !== 'generated') {
            this.deleteScriptStepFields(out);
        }
        if (this.action !== 'script') {
            delete out.script;
        }
        if (this.action !== 'dockerfile' && this.action !== 'generated') {
            delete out.includeVariables;
            delete out.excludeVariables;
        } else {
            if (this.action !== 'generated') {
                delete out.generator;
            }
            if (this.action !== 'dockerfile') {
                delete out.dockerfile;
            }
            
            if (this.transient.explicitExcludeVariables) {
                out.excludeVariables = this.excludeVariables || [];
            }

            if (this.transient.explicitIncludeVariables) {
                out.includeVariables = this.includeVariables || [];
            }
        }
        if (this.action !== 'call') {
            delete out.target;
        }

        if (out.imageSource === 'image') {
            delete out.imageSource;
        }

        if (out.environment && out.environment.length === 0) {
            delete out.environment;
        }
        else if (out.environment) {
            out.environment = cleanKeyValueEntryArray(out.environment);
        }
        if (out.ports && out.ports.length === 0) {
            delete out.ports;
        }
        if (out.volumes && out.volumes.length === 0) {
            delete out.volumes;
        }
        
        return out;
    }

    private deleteScriptStepFields (step: IWorkflowStepSimple) {
        delete step.environment;
        delete step.generator;
        delete step.health;
        delete step.ignoreFailure;
        delete step.ignoreMissing;
        delete step.ignoreValidation;
        delete step.image;
        delete step.omitSource;
        delete step.dockerignore;
        delete step.ports;
        delete step.readiness;
        delete step.script;
        delete step.sourceLocation;
    }
}

export class WorkflowStepCompound extends WorkflowStepBase implements IWorkflowStepCompound {
    readonly type: StepType = 'compound';

    constructor(step: Partial<WorkflowStepCompound>) {
        super(step);
        Object.assign(this, step);
    }

    @observable steps?: WorkflowStep[] = [];

    static apply(source: IWorkflowStepCompound): WorkflowStepCompound {
        return Object.assign(new WorkflowStepCompound({}), source, {
            type: 'compound',
            steps: (source.steps || []).map(step => {
                if (step.type === 'compound') return WorkflowStepCompound.apply(step);
                else return WorkflowStepSimple.apply(step as WorkflowStepSimple);
            })
        });
    }

    toJS(): IWorkflowStepCompound {
        return {
            name: this.name,
            type: this.type,
            steps: this.steps.map(step => step.toJS())
        };
    }
}

function fillObj (source: any): any {
    let out: any = {},
        keys = Object.keys(source);

    for (var i = 0; i < keys.length; i++) {
        if(typeof source[keys[i]] !== 'function' && keys[i] !== 'transient') {
            out[keys[i]] = source[keys[i]];
        }
    }

    return out;
}

function cleanKeyValueEntryArray (source: KeyValueEntry[]): KeyValueEntry[] {
    let out: KeyValueEntry[] = [];

    try {
        if (!Array.isArray(source) && !isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            if (source[i].file) {
                out.push({file: source[i].file})
            }
            else {
                out.push({name: source[i].name, value: source[i].name})
            }
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing KeyValueEntry";
    }

    return out;
}

function cleanPortEntryArray (source: PortEntry[]): PortEntry[] {
    let out: PortEntry[] = [];

    try {
        if (!Array.isArray(source) && !isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            out.push({
                name: source[i].name || undefined, 
                internalPort: source[i].internalPort || undefined,
                externalPort: source[i].externalPort || undefined,
                containerPort: source[i].containerPort,
                protocol: source[i].protocol || 'tcp'
            });
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing PortEntry";
    }

    return out;
}

function cleanVolumes (source: Volume[]): Volume[] {
    let out: Volume[] = [];

    try {
        if (!Array.isArray(source) && !isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            out.push({hostPath: source[i].hostPath, mountPath: source[i].mountPath})
        }
    }
    catch (e) {
        console.error(e);
        throw "Structure error parsing Volumes";
    }

    return out;
}

export function cleanPorts (source: string[]): string[] {
    let out: string[] = [];

    try {
        if (!Array.isArray(source) && !isObservableArray(source)) {
            throw Error;
        }
        for (var i = 0; i < source.length; i++) {
            if (source[i] !== undefined) {
                if (typeof source[i] !== 'string') {
                    throw "Structure error parsing ports";
                }
                out.push(source[i])
            }
        }
    }
    catch (e) {
        throw "Structure error parsing ports";
    }

    return out;
}

function tryApply (obj: {transient: TransientState}, key: string, fn: () => void, catchFn?: () => void): boolean {
    let success: any;

    try {
        success = fn();
    }
    catch(e) {
        success = false;
    }

    if (success === false) {
        obj.transient.parseError.push(key);
        catchFn && catchFn();
    }

    return success;
}

function tryApplyPrimitive (obj: {transient: TransientState}, key: string, source: any, type: string, require: boolean = false, cast?: (input: any) => any) {
    return tryApply(obj, key,
        () => {
            if (require || source[key] !== undefined) {
                let value = source[key];
                if (cast) {
                    value = cast(value);
                }
                if (typeof value === type) {
                    (obj as any)[key] = value;
                }
                else throw "type error on field " + key;
            }
        });
}

function tryApplyEnum (obj: {transient: TransientState}, key: string, source: any, enumVals: string[], require: boolean = false, catchFn?: () => void) {
    return tryApply(obj, key, 
    () => {
        if (require || source[key] !== undefined) {
            if (enumVals.indexOf(source[key]) > -1) {
                (obj as any)[key] = source[key];
            }
            else throw Error;
        }
    },
    catchFn);
};

//import { keysOfIHealth,keysOfIReadiness,keysOfIWorkflowStepSimple} from '../workflow-interfaces';