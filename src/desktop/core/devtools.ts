
export const installExtensions = async () => {
        const installer = require('electron-devtools-installer');
        const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

        for (const extension of extensions)
          {
            try {installer.default(installer[extension], forceDownload)} 
            catch (error) {console.log(error)}
          }
}


class AppURL {
    /**
     * Allows for webpack to intercept resources as needed for hot-reloading
     */
    getElectronResource(location) {
        if (process.env.NODE_ENV === 'development') {
            location = `http://localhost:8080/${location}`;
        } else {
            location = `file://${__dirname}/${location}`;
        }
        return location;
    }
}

export let appURL = new AppURL();