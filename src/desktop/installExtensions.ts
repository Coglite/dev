import * as installer from 'electron-devtools-installer';

export function installExtensions(){

        const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

        for (const extension of extensions)
          {
            try {installer.default(installer[extension]), forceDownload} 
            catch (error){}
          }
}