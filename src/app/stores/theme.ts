
import { observable, action } from 'mobx'

export type Theme = {
  id: string;
  name: string;
  primaryColor: string;
  textColor: string;
}


export function createTheme (id: string,name: string,primaryColor: string,textColor: string): Theme {
  return { id, name, primaryColor, textColor }
}


type IThemeStore = {
  theme: Theme;
  themes: Array<Theme>;
  changeTheme(theme: Theme): void;
  changeThemeById(themeId: string): void;
  serialize (): any;
  deserialize (data: any): void,
}

const themes = [
  createTheme('light', 'Light theme', '#2395f3', '#454552'),
  createTheme('dark', 'Dark theme', '#EC6A5C', '#fff')
]


class ThemeStore implements IThemeStore {
    @observable themes = themes
    @observable theme = themes[0]
    
    @action changeTheme = (theme: Theme) => {this.theme = theme}
    
    @action changeThemeById (themeId: string) {
      this.changeTheme(_themeById(themeId))
    }
    
    serialize () {return {selectedTheme: this.theme.id}}

    deserialize (data) {this.changeThemeById(data.selectedTheme)}
}

function _themeById (id?: string): Theme {
  const theme = themes.find(x => x.id === id)
  if (!theme) {
    return themes[0]
  }

  return theme
}