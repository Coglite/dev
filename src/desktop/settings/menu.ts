//import { app, Menu, BrowserWindow } from 'electron';
import { Menu, BrowserWindow } from 'electron';

export function initMenu() {

    const windowMenu: any = {
            role: 'window',
            submenu: [{ role: 'minimize' },{ role: 'close' }]
    };

    windowMenu.submenu.push({ role: 'reload' });
    windowMenu.submenu.push({ role: 'toggledevtools' });


    const template: any[] = [
            {
                label: 'coglite',
                submenu: [
                  {role: 'about'},
                  {type: 'separator'},
                  {role: 'services', submenu: []},
                  {type: 'separator'},
                  {role: 'hide'},
                  {role: 'hideothers'},
                  {role: 'unhide'},
                  {type: 'separator'},
                  {role: 'quit'}
                ]
            },
            {
                label: 'File',
                submenu: [
                    {
                        label: 'New Workflow',
                        accelerator: 'CmdOrCtrl+N',                    
                        click () {
                            let focusedWindow = BrowserWindow.getFocusedWindow();
    
                            if (focusedWindow) {
                                focusedWindow.webContents.send('new');
                            }
                        }
                    },
                    {
                        label: 'Open...',
                        accelerator: 'CmdOrCtrl+O',                    
                        click () {
                            let focusedWindow = BrowserWindow.getFocusedWindow();
    
                            if (focusedWindow) {
                                focusedWindow.webContents.send('open');
                            }
                        }
                    },
                    {
                        label: 'Save Workflow',
                        accelerator: 'CmdOrCtrl+S',                    
                        click () {
                            let focusedWindow = BrowserWindow.getFocusedWindow();
    
                            if (focusedWindow) {
                                focusedWindow.webContents.send('save');
                            }
                        }
                    },
                    {
                        label: 'Save Workflow As...',
                        accelerator: 'CmdOrCtrl+Shift+S',                    
                        click () {
                            let focusedWindow = BrowserWindow.getFocusedWindow();
    
                            if (focusedWindow) {
                                focusedWindow.webContents.send('saveAs');
                            }
                        }
                    }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                  {role: 'undo'},
                  {role: 'redo'},
                  {role: 'cut'},
                  {role: 'copy'},
                  {role: 'paste'},
                  {role: 'selectall'}
                ]
              },

            windowMenu
        ];

      return Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }

    
