import { ThemeStore } from './ThemeStore';
import { NavigationStore } from './NavigationStore';

export class CogliteAppStore {
  theme = new ThemeStore()
  nav = new NavigationStore()
}