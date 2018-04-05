
```javascript

interface WebPreferences {
    devTools?: boolean;
    nodeIntegration?: boolean;
    nodeIntegrationInWorker?: boolean;
    preload?: string;
    sandbox?: boolean;
    session?: Session;
    partition?: string;
    zoomFactor?: number;
    javascript?: boolean;
    webSecurity?: boolean;
    allowRunningInsecureContent?: boolean;
    images?: boolean;
    textAreasAreResizable?: boolean;
    webgl?: boolean;
    webaudio?: boolean;
    plugins?: boolean;
    experimentalFeatures?: boolean;
    experimentalCanvasFeatures?: boolean;
    scrollBounce?: boolean;
    blinkFeatures?: string;
    disableBlinkFeatures?: string;
    defaultFontFamily?: DefaultFontFamily;
    defaultFontSize?: number;
    defaultMonospaceFontSize?: number;
    minimumFontSize?: number;
    defaultEncoding?: string;
    backgroundThrottling?: boolean;
    offscreen?: boolean;
    contextIsolation?: boolean;
    nativeWindowOpen?: boolean;
    webviewTag?: boolean;
  }
  ```