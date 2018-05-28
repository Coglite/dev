import {WebAPIClient} from './webapi';
import {JobStatus, JobFailure, JobProgress} from "./webapi";
import {PanelContainerLayout} from "./components/PanelContainer";
import {ViewLayoutState, ViewState} from "./components/ViewState";
import {Feature, FeatureCollection, GeoJsonObject, Point} from "geojson";
import {IconName} from "@blueprintjs/core";
import {SimpleStyle} from "../common/geojson-simple-style";
import {GeometryToolType} from "./components/cesium/geometry-tool";

export interface State {
    data: DataState;
    communication: CommunicationState;
    control: ControlState;
    session: SessionState;
    location: LocationState;
}


export interface DataState {
    appConfig: AppConfigState;
    dataStores: DataStoreState[] | null;
    operations: OperationState[] | null;
    workspace: WorkspaceState | null;
    colorMaps: ColorMapCategoryState[] | null;
}


export interface AppConfigState {
    webAPIConfig: WebAPIConfig;
    webAPIClient: WebAPIClient | null;
    hasWebGL: boolean;
}

export interface WebAPIConfig {
    // Values read by main.ts from ./cate-config.js
    servicePort: number;
    serviceAddress: string;
    serviceFile?: string;
    processOptions?: Object;
    useMockService?: boolean;
    // Values computed in main.ts
    restUrl: string;
    apiWebSocketUrl: string;
    mplWebSocketUrl: string;
}

export interface DataStoreState {
    id: string;
    title: string | null;
    isLocal: boolean;
    dataSources?: DataSourceState[] | null;
}

export interface DataSourceState {
    id: string;
    title?: string;
    meta_info: any | null;
    temporalCoverage?: any | null;
}

export interface OperationState {
    name: string;
    qualifiedName: string;
    hasMonitor: boolean;
    description: string | null;
    tags: Array<string>;
    inputs: OperationInputState[];
    outputs: OperationOutputState[];
}

// see https://github.com/electron/electron/blob/master/docs/api/dialog.md
// see https://github.com/electron/electron/blob/master/docs/api/structures/file-filter.md
export interface FileFilterState {
    name: string;
    extensions: string[];
}

export interface OperationIOBaseState {
    name: string;
    dataType: string;
    description: string | null;
    units?: string | null;
}


/* optional properties used mainly for validation */
export interface OperationInputState extends OperationIOBaseState {
    defaultValue?: any;
    nullable?: boolean;
    valueSet?: any[];
    valueSetSource?: string;
    valueRange?: [number, number] | [string, string];
    scriptLang?: string;
    fileOpenMode?: 'w' | 'r' | 'rw';
    fileFilters?: FileFilterState[];
    fileProps?: string;
    noUI?: boolean;
}

export interface OperationOutputState extends OperationIOBaseState {
}


export interface OperationArgumentValue {
    value: any;
}


export interface OperationArgumentSource {
    source: string;
}


export type OperationArg = OperationArgumentValue | OperationArgumentSource;

export type OperationKWArgs = { [name: string]: OperationArg };


export interface WorkspaceState {
    baseDir: string;
    description: string | null;
    isScratch: boolean;
    isModified: boolean;
    isSaved: boolean;
    workflow: WorkflowState;
    resources: ResourceState[];
}


export interface WorkflowState {
    steps: WorkflowStepState[];
}


export interface WorkflowStepState {
    id: string;
    type: 'operation' | 'workflow' | 'python-expression' | 'python-script' | 'executable';
    op: string;
    persistent?: boolean;
    inputs: { [name: string]: WorkflowPortState & string };
    outputs: { [name: string]: WorkflowPortState & string };
}


export interface WorkflowPortState {
    value: any | undefined;
    source: string | null;
}

export type DimSizes = { [dimName: string]: number };
export type Attributes = { [attrName: string]: any };


export interface ResourceState {
    id: number;
    updateCount: number;
    name: string;
    dataType: string;
    dimSizes?: DimSizes;
    units?: string;
    validMin?: number;
    validMax?: number;
    attributes?: Attributes;
    variables?: VariableState[];
    coordVariables?: VariableState[];
}


export interface VariableState {
    name: string;
    dataType: string;
    numDims?: number;
    dimNames?: string[];
    shape?: number[];
    chunkSizes?: number[];
    units?: string;
    validMin?: number;
    validMax?: number;
    data?: any[];
    attributes?: Attributes;
    isCoord?: boolean;
    isDefault?: boolean;
    imageLayout?: ImageLayout;
    isFeatureAttribute?: boolean;
    isYFlipped?: boolean;
    colorMapName?: string;
    displayMin?: number;
    displayMax?: number;
}


export interface ImageLayout {
    extent?: {
        west: number,
        south: number,
        east: number,
        north: number
    };
    ellipsoid?: {
        x: number;
        y: number;
        z: number;
    };
    numLevels: number;
    numLevelZeroTilesX: number;
    numLevelZeroTilesY: number;
    tileWidth: number;
    tileHeight: number;
}

export type WorldViewMode = "2D" | "3D";

export interface WorldViewDataState {
    /**
     * 2D map or 3D globe?
     */
    viewMode: WorldViewMode;

    /**
     * Code of the projection used by the 2D map.
     */
    projectionCode: string;

    /**
     * The layers in a viewer.
     */
    layers: LayerState[];

    /**
     * The ID of the selected layer.
     */
    selectedLayerId: string | null;

    /**
     * The ID of the selected entity in Cesium 3D globe.
     */
    selectedEntityId: string | null;

    /**
     * The position of a layer split. Must be in the range 0 to 1.
     */
    layerSplitPosition;
}

export interface FigureViewDataState {
    /**
     * The resource identifier.
     */
    resourceId: number;
    /**
     * Whether the figure has a fixed size or it adapts to the current container size.
     */
    fixedSize: boolean;
}

export interface AnimationViewDataState extends FigureViewDataState {
    /**
     * The HTML representing the animation.
     */
    innerHTML?: string;
    /**
     * The response status.
     */
    status?: number;
}


export interface TableViewDataState {
    resName: string;
    varName: string | null;
    dataRows: any[] | null;
    error?: any;
    isLoading?: boolean;
}


/**
 * State of a layer.
 */
export interface LayerState {
    /**
     * Layer ID.
     */
    id: string;

    /**
     * Layer type
     */
    type: 'VariableImage' | 'ResourceVector' | 'Image' | 'Vector' | 'Unknown';

    /**
     * Layer name.
     */
    name?: string | null;

    /**
     * True if the layer is visible and shown; otherwise, false.
     */
    visible: boolean;

    /**
     * The layer's opacity.
     */
    opacity?: number;
}

export interface ImageStatisticsState {
    /**
     * The true minimum value in the current data subset.
     */
    min: number;

    /**
     * The true maximum value in the current data subset.
     */
    max: number;
}

export const SPLIT_MODE_OFF = "off";
export const SPLIT_MODE_LEFT = "left";
export const SPLIT_MODE_RIGHT = "right";
export type SplitMode = "off" | "left" | "right";


/**
 * Base of image layers.
 */
export interface ImageLayerBase extends LayerState {
    /**
     * The brightness of this layer. 1.0 uses the unmodified imagery color.
     * Less than 1.0 makes the imagery darker while greater than 1.0 makes it brighter.
     */
    brightness: number;

    /**
     * The contrast of this layer. 1.0 uses the unmodified imagery color.
     * Less than 1.0 reduces the contrast while greater than 1.0 increases it.
     */
    contrast: number;

    /**
     * The hue of this layer. 0.0 uses the unmodified imagery color.
     */
    hue: number;

    /**
     * The saturation of this layer. 1.0 uses the unmodified imagery color.
     * Less than 1.0 reduces the saturation while greater than 1.0 increases it.
     */
    saturation: number;

    /**
     * The gamma correction to apply to this layer. 1.0 uses the unmodified imagery color.
     */
    gamma: number;

    /**
     * Split mode.
     */
    splitMode: SplitMode;
}

/**
 * State of an image layer.
 */
export interface ImageLayerState extends ImageLayerBase {
    /**
     * The layer type.
     */
    type: 'Image';
}

/**
 * Base of vector layers.
 */
export interface VectorLayerBase extends LayerState {
    /**
     * Stores the default style for all entities of the layer.
     */
    style?: SimpleStyle;

    /**
     * Stores the style and any edited entities.
     * This object will only contain keys, if an entities style has changed.
     * Default styles come from the SimpleStyle interface of VectorLayerBase.
     */
    entityStyles?: {[entityId: string]: SimpleStyle};
}


/**
 * State of a vector layer.
 */
export interface VectorLayerState extends VectorLayerBase {
    /**
     * The layer type.
     */
    type: 'Vector';

    /**
     * The (GeoJSON-providing) URL or GeoJSON object.
     */
    data: string | GeoJsonObject;
}

/**
 * Resource reference
 */
export interface ResourceRefState {
    /**
     * The id of the resource that contains the variable.
     */
    resId: number;
}

/**
 * Variable reference
 */
export interface VariableRefState extends ResourceRefState {
    /**
     * The name of the variable.
     */
    varName: string;
}

/**
 * Variable data reference
 */
export interface VariableDataRefState extends VariableRefState {
    /**
     * The current index into the variable that results in a 2D-subset (i.e. with dimensions ['lat', 'lon']).
     */
    varIndex: number[];
}

/**
 * State of an image layer that displays a variable.
 */
export interface VariableLayerBase extends LayerState, VariableDataRefState {
    /**
     * Image layer minimum display value.
     */
    displayMin: number;
    /**
     * Image layer maximum display value.
     */
    displayMax: number;
    /**
     * Image layer color map name.
     */
    colorMapName: string;
    /**
     * Whether to blend alpha 0...1 at bottom value range.
     */
    alphaBlending: boolean;
    /**
     * Image enhancement attributes.
     */
    statistics?: ImageStatisticsState;
}

/**
 * State of an image layer that displays a variable.
 */
export interface VariableImageLayerState extends ImageLayerBase, VariableLayerBase {
    /**
     * The layer type.
     */
    type: 'VariableImage';
}

/**
 * State of an image layer that displays a variable.
 */
export interface ResourceVectorLayerState extends VectorLayerBase, ResourceRefState {
    /**
     * The layer type.
     */
    type: 'ResourceVector';
}

/**
 * An object comprising the resource and one of its variables which can be represented as a spatial 2D layer.
 */
export class LayerVariableState {
    /**
     * The resource.
     */
    resource: ResourceState;
    /**
     * A spatial 2D variable within the resource.
     */
    variable: VariableState;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ColorMapState


export interface ColorMapState {
    name: string;
    imageData: string;
}

export interface ColorMapCategoryState {
    name: string;
    description: string;
    colorMaps: ColorMapState[];
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CommunicationState

/**
 * Communication state is the status of any not-yet-complete requests to other services.
 */
export interface CommunicationState {
    webAPIStatus: 'connecting' | 'open' | 'error' | 'closed' | null;

    // A map that stores the current state of any tasks (e.g. data fetch jobs from remote API) given a jobId
    tasks: { [jobId: number]: TaskState; };
}

export interface TaskState {
    title?: string;
    status: JobStatus;
    failure?: JobFailure;
    progress?: JobProgress;
    requestLock?: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ControlState


/**
 * Control State is state which is specific to a given container component, and which is not stored in the screen’s
 * URL or in the HTML5 History API.
 */
export interface ControlState {

    // TODO (forman): Move following selection properties into workspace so they can be stored.
    // WorkspacePanel
    selectedWorkspaceResourceName: string | null;
    selectedWorkflowStepId: string | null;
    // VariablesPanel
    selectedVariableName: string | null;

    selectedCtxOperationName: string | null;

    // LayersPanel

    // A map that stores the last state of any dialog given a dialogId
    dialogs: { [dialogId: string]: DialogState };

    // Take care, workspace objects come from Python back-end, therefore must preserve view settings.
    viewLayout: ViewLayoutState;
    views: ViewState<any>[];
    activeViewId: string | null;

    newPlacemarkToolType: GeometryToolType;

    // Used to force component update after an entity's properties have changed
    entityUpdateCount: number;

    mouseIdle: boolean;
}

export interface DialogState {
    isOpen?: boolean;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SessionState

export type SavedLayers = { [key: string]: LayerState };

/**
 * Backend-configuration settings.
 */
export interface BackendConfigState {
    dataStoresPath: string;
    useWorkspaceImageryCache: boolean;
    resourceNamePattern: string;
    proxyUrl: string;
}

export interface Placemark extends Feature<Point> {
    id: string;
}

export interface PlacemarkCollection extends FeatureCollection<Point> {
    features: Placemark[];
}

export const STYLE_CONTEXT_ENTITY = 'entity';
export const STYLE_CONTEXT_LAYER = 'layer';

export type StyleContext = 'entity' | 'layer';

/**
 * Session state contains information about the human being which is currently using Cate.
 * Session state is only ever read when a component is mounted.
 * Session state can be used to save preferences.
 */
export interface SessionState {
    lastWorkspaceDir?: string | null;
    mainWindowBounds?: { x: number; y: number; width: number; height: number };
    devToolsOpened?: boolean;
    /**
     * lastWorkspacePath != null, only if it is not a scratch-workspace
     */
    lastWorkspacePath?: string;
    reopenLastWorkspace?: boolean;
    offlineMode: boolean;
    autoUpdateSoftware: boolean;
    autoShowNewFigures: boolean;

    // ApplicationPage
    panelContainerUndockedMode: boolean;
    leftPanelContainerLayout: PanelContainerLayout;
    rightPanelContainerLayout: PanelContainerLayout;
    selectedLeftTopPanelId: string | null;
    selectedLeftBottomPanelId: string | null;
    selectedRightTopPanelId: string | null;
    selectedRightBottomPanelId: string | null;

    showLayerTextOverlay: boolean;
    debugWorldView: boolean;

    /**
     * backendConfig settings are applied on restart (of the WebAPI) only.
     */
    backendConfig: BackendConfigState;

    // DataSourcesPanel
    selectedDataStoreId: string | null;
    selectedDataSourceId: string | null;
    dataSourceFilterExpr: string;
    dataSourceListHeight: number;
    showDataSourceDetails: boolean;
    showDataSourceTitles: boolean;

    // OperationsPanel
    selectedOperationName: string | null;
    operationFilterTags: string[];
    operationFilterExpr: string;
    operationListHeight: number;
    showOperationDetails: boolean;

    // WorkspacePanel
    workspacePanelMode: 'resources' | 'steps';
    resourceListHeight: number;
    showResourceDetails: boolean;
    workflowStepListHeight: number;
    showWorkflowStepDetails: boolean;

    // VariablePanel
    variableListHeight: number;
    showVariableDetails: boolean;

    // LayersPanel
    showSelectedVariableLayer: boolean;
    layerListHeight: number;
    showLayerDetails: boolean;
    savedLayers: SavedLayers;
    styleContext: StyleContext;

    // PlacemarksPanel
    placemarkCollection: PlacemarkCollection;
    selectedPlacemarkId: string | null;
    placemarkListHeight: number;
    showPlacemarkDetails: boolean;
    defaultPlacemarkStyle: SimpleStyle;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LocationState

export class GeographicPosition {
    longitude: number;
    latitude: number;
    height?: number;
}

/**
 * Location state stores information about the current location in space and time.
 * Information in this object may change frequently, e.g. due to mouse moves on a Globe.
 */
export interface LocationState {
    globeMousePosition: GeographicPosition | null;
    globeViewPosition: GeographicPosition | null;
    positionData: { [varName: string]: number } | null
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MessageState

export interface MessageActionState {
    text: string;
    onClick?: (...actionArgs) => void;
    href?: string;
    iconName?: IconName;
}

export interface MessageState {
    type: 'info' | 'success' | 'notification' | 'warning' | 'error';
    text: string | JSX.Element;
    action?: MessageActionState;
}

