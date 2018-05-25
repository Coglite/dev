//import { observable } from "mobx";

export interface IWorkflowStepPos {
    parent: IWorkflow | IWorkflowStepCompound;
    index: number;
}

export interface IWorkflow {
    steps: IWorkflowStep[];
    workflowVariables?: KeyValueEntry[];
    ignoreFailure?: boolean;
    ignoreValidation?: boolean;
    ignoreMissing?: boolean;
}

export type IWorkflowStep = IWorkflowStepSimple | IWorkflowStepCompound;

export const imageSources = {
    image: '',
    step: ''
}

export type ImageSource = keyof typeof imageSources;
export const ImageSources = Object.keys(imageSources);

export const stepTypes = {
    sequential: '',
    parallel: '',
    service: '',
    compound: ''
}

export type StepType = keyof typeof stepTypes;
export const StepTypes = Object.keys(stepTypes);

export const healthTypes = {
    http: '',
    https: '',
    tcp: '',
    script: ''
}

export type HealthType = keyof typeof healthTypes;
export const HealthTypes = Object.keys(healthTypes);

export function isStepType(x: string): x is StepType {
    return stepTypes.hasOwnProperty(x);
}

export interface IWorkflowStepBase {
    name: string;
    type: StepType;
}

export type KeyValueEntryType = 'pair' | 'file';

export interface KeyValueEntry {
    name?: string;
    value?: string;
    file?: string;
}

export interface PortEntry {
    name?: string;
    containerPort: number,
    externalPort?: number,
    internalPort?: number,
    protocol?: 'tcp' | 'udp',
}

export interface Volume {
    hostPath?: string;
    mountPath?: string;
}

export interface IHealth {
    type: HealthType;
    script?: string;
    port?: string;
    path?: string;
    interval?: number;
    retries?: number;
    grace?: number;
    timeout?: number;
    headers?: KeyValueEntry[];
}

export const keysOfIHealth: (
    "type" | "script" | "port" | "path" | 
    "interval" | "retries" | "grace" | "timeout" | "headers")[] = [
        "type", "script", "port", "path", 
        "interval", "retries", "grace", "timeout", "headers"];

export interface IReadiness extends IHealth {
    skipWait?: boolean;
}

export const keysOfIReadiness: (
    "type" | "script" | "port" | "path" | "skipCheck" |
    "interval" | "retries" | "grace" | "timeout" | "headers")[] = [
        "type", "script", "port", "path", "skipCheck",
        "interval", "retries", "grace", "timeout", "headers"];

export interface IWorkflowStepSimple extends IWorkflowStepBase {
    imageSource?: ImageSource;
    image?: string;
    
    target?: string;
    generator?: string;

    script?: string;
    omitSource?: boolean;
    sourceLocation?: string;
    ignoreFailure?: boolean;
    ignoreValidation?: boolean;
    ignoreMissing?: boolean;
    health?: IHealth;
    readiness?: IReadiness;
    environment?: KeyValueEntry[];
    ports?: PortEntry[];
    volumes?: Volume[];
    dockerignore?: string;

    includeVariables?: string[] | string;
    excludeVariables?: string[] | string;
    
    dockerfile?: string;
}

export const keysOfIWorkflowStepSimple: (
    "imageSource" | "image" | "target" | 
    "generator" | "script" | "omitSource" | "sourceLocation" | 
    "ignoreFailure" | "ignoreValidation" | "ignoreMissing" | 
    "includeVariables" | "excludeVariables" | "dockerignore" |
    "health" | "readiness" | "environment" | 
    "ports" | "volumes" | "dockerfile" | "name" | "type")[] = [
        "imageSource", "image", "target", 
        "generator", "script", "omitSource", "sourceLocation", 
        "ignoreFailure", "ignoreValidation", "ignoreMissing", 
        "includeVariables", "excludeVariables", "dockerignore",
        "ignoreFailure", "health", "readiness", "environment", 
        "ports", "volumes", "dockerfile", "name", "type"];

export interface IWorkflowStepCompound extends IWorkflowStepBase {
    steps?: IWorkflowStep[];
}
