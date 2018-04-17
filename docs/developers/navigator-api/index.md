    ```javascript
    readonly activeVRDisplays: ReadonlyArray<VRDisplay>;
    readonly authentication: WebAuthentication;
    readonly cookieEnabled: boolean;
    readonly doNotTrack: string | null;
    gamepadInputEmulation: GamepadInputEmulationType;
    readonly geolocation: Geolocation;
    readonly maxTouchPoints: number;
    readonly mimeTypes: MimeTypeArray;
    readonly msManipulationViewsEnabled: boolean;
    readonly msMaxTouchPoints: number;
    readonly msPointerEnabled: boolean;
    readonly plugins: PluginArray;
    readonly pointerEnabled: boolean;
    readonly serviceWorker: ServiceWorkerContainer;
    readonly webdriver: boolean;
    getGamepads(): (Gamepad | null)[];
    getVRDisplays(): Promise<VRDisplay[]>;
    javaEnabled(): boolean;
    msLaunchUri(uri: string, successCallback?: MSLaunchUriCallback, noHandlerCallback?: MSLaunchUriCallback): void;
    requestMediaKeySystemAccess(keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
    vibrate(pattern: number | number[]): boolean;
    ```

example:

```javascript
const getCurrentPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default =
    currentPosition: async (_, { enableHighAccuracy, timeout, maximumAge }) => {
      if (!navigator.geolocation) return null;
      try {
        const data = await getCurrentPosition({
          enableHighAccuracy,
          timeout,
          maximumAge,
        });

```