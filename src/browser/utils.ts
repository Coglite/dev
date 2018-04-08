import { JSONObject } from '@phosphor/coreutils';
import { webFrame } from 'electron';


export
namespace JupyterServer {

    export
    interface IServer extends JSONObject {
        token: string;
        url: string;
        type: 'local' | 'remote';
        name: string;
    }

    export
    function verifyServer(server: IServer): boolean {
        return !(!server.token || !server.url || !server.type || !server.name);
    }
}


export
namespace Browser {

    export
    function getTopPanelSize(): number {
        return 23 / webFrame.getZoomFactor();
    }
}
