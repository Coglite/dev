import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import plugins from '@jupyterlab/application-extension';
import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { ServerConnection, ServiceManager } from '@jupyterlab/services';
import { each } from '@phosphor/algorithm';
import { Widget } from '@phosphor/widgets';

import { asyncRemoteRenderer } from '../../../asyncremote';
import { JupyterLabSession } from '../../../main/sessions';
import { IShortcutManager } from '../../../main/shortcuts';
import { Browser } from '../../utils';


/**
 * The command IDs used by the application plugin.
 */
namespace CommandIDs {
  export
  const activateNextTab: string = 'main-jupyterlab:activate-next-tab';

  export
  const activatePreviousTab: string = 'main-jupyterlab:activate-previous-tab';

  export
  const closeAll: string = 'main-jupyterlab:close-all';

  export
  const setMode: string = 'main-jupyterlab:set-mode';

  export
  const toggleMode: string = 'main-jupyterlab:toggle-mode';
}


export
class ElectronJupyterLab extends JupyterLab {

  constructor(options: ElectronJupyterLab.IOptions) {
    /**
     * WORKAROUND
     * The constructor of JupyterLab in @jupyterlab/application initializes
     * the ServiceManager with the default options. The default options
     * include the baseUrl and token at the moment when the application starts
     * without an option to override them. JupyterLab_app starts the server
     * and sets the relevant config data at runtime, so the default settings
     * no longer work. Therefore overriding the default options is the only
     * solution at the moment.
     *
     * @jupyterlab/application 0.15.4
     */
    const oldMakeSettings = ServerConnection.makeSettings;
    ServerConnection.makeSettings = function(options?: Partial<ServerConnection.ISettings>) {
      options = {
        ...options,
        ...{
          baseUrl: PageConfig.getBaseUrl(),
          pageUrl: PageConfig.getOption('pageUrl'),
          wsUrl: PageConfig.getWsUrl(),
          token: PageConfig.getToken()
        }
      };
      return oldMakeSettings(options);
    };

    super(options);

    this._electronInfo = { ...JupyterLab.defaultInfo, ...options };
    if (this._electronInfo.devMode) {
      this.shell.addClass('jp-mod-devMode');
    }

    // Get the top panel widget
    let topPanel: Widget;
    each(this.shell.layout.iter(), (widget: Widget) => {
      if (widget.id === 'jp-top-panel') {
        topPanel = widget;
        return false;
      }
    });
    topPanel.addClass('jpe-mod-' + options.uiState);

    if (options.uiState === 'mac') {
      // Resize the top panel based on zoom factor
      topPanel.node.style.minHeight = topPanel.node.style.height = String(Browser.getTopPanelSize()) + 'px';
      // Resize the top panel on zoom events
      asyncRemoteRenderer.onRemoteEvent(IShortcutManager.zoomEvent, () => {
        topPanel.node.style.minHeight = topPanel.node.style.height = String(Browser.getTopPanelSize()) + 'px';
        this.shell.fit();
      });
    }
  }

  get info(): ElectronJupyterLab.IInfo {
    return this._electronInfo;
  }

  /**
   * The service manager used by the application.
   */
  readonly serviceManager: ServiceManager;

  private _electronInfo: ElectronJupyterLab.IInfo;
}

export
namespace ElectronJupyterLab {

  export
  interface IOptions extends JupyterLab.IOptions {
    uiState?: JupyterLabSession.UIState;
    platform: NodeJS.Platform;
  }

  export
  interface IInfo extends JupyterLab.IInfo {
    uiState?: string;
    platform: string;
  }

  /**
   * The default application info.
   */
  export
  const defaultInfo: IInfo = { ...{
    uiState: PageConfig.getOption('uistate') || 'windows',
    platform: PageConfig.getOption('platform')
  }, ...JupyterLab.defaultInfo };
}

/**
 * The main extension.
 */
const mainPlugin: JupyterLabPlugin<void> = {
  id: 'jupyter.extensions.main',
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    addCommands(app, palette);
  },
  autoStart: true
};

/**
 * Add the main application commands.
 */
function addCommands(app: JupyterLab, palette: ICommandPalette): void {
  const category = 'Main Area';
  let command = CommandIDs.activateNextTab;
  app.commands.addCommand(command, {
    label: 'Activate Next Tab',
    execute: () => { app.shell.activateNextTab(); }
  });
  palette.addItem({ command, category });

  command = CommandIDs.activatePreviousTab;
  app.commands.addCommand(command, {
    label: 'Activate Previous Tab',
    execute: () => { app.shell.activatePreviousTab(); }
  });
  palette.addItem({ command, category });

  command = CommandIDs.closeAll;
  app.commands.addCommand(command, {
    label: 'Close All Widgets',
    execute: () => { app.shell.closeAll(); }
  });
  palette.addItem({ command, category });

  command = CommandIDs.setMode;
  app.commands.addCommand(command, {
    isVisible: args => {
      const mode = args['mode'] as string;
      return mode === 'single-document' || mode === 'multiple-document';
    },
    execute: args => {
      const mode = args['mode'] as string;
      if (mode === 'single-document' || mode === 'multiple-document') {
        app.shell.mode = mode;
        return;
      }
      throw new Error(`Unsupported application shell mode: ${mode}`);
    }
  });

  command = CommandIDs.toggleMode;
  app.commands.addCommand(command, {
    label: 'Toggle Single-Document Mode',
    execute: () => {
      const args = app.shell.mode === 'multiple-document' ?
        { mode: 'single-document' } : { mode: 'multiple-document' };
      return app.commands.execute(CommandIDs.setMode, args);
    }
  });
  palette.addItem({ command, category });
}


/**
 * Override default jupyterlab plugins
 */
let nPlugins = plugins.map((p: JupyterLabPlugin<any>) => {
    if (p.id === 'jupyter.extensions.main') {
      return mainPlugin;
    }
    return p;
});
export default nPlugins;