
export const installExtensions = async () => {
        const installer = require('electron-devtools-installer');
        const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

        for (const extension of extensions)
          {
            try {installer.default(installer[extension], forceDownload)} 
            catch (error){
              //console.log(error)
              }
          }
}