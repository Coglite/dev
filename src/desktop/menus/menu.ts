import {Menu} from 'electron'
import { devMenuTemplate } from "./dev-menu";
import { editMenuTemplate } from "./edit-menu";



export const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
    menus.push(devMenuTemplate);
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};