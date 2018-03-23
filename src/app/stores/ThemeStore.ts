

import {observable, action} from 'mobx'

export class ThemeStore {

@observable navigatorPosition: string = "is-aside"
@observable navigatorShape: string = "open"
@observable navigatorFilter: string = ""
@observable isWideScreen: boolean = false
@observable scrollToTop: boolean = false
@observable fontSizeIncrease: number = 1
@observable categoryFilter: any = "all posts"

constructor(){}

@action setNavigatorPosition(navigatorPosition) {
  return navigatorPosition;
}

@action setNavigatorShape(navigatorShape) {
  return {  };
}

@action setNavigatorFilter(navigatorFilter) {
  return {  };
}

@action setIsWideScreen(isWideScreen) {
  return { isWideScreen};
}

@action setScrollToTop(scrollToTop) {
  return { scrollToTop};
}

@action setFontSizeIncrease(fontSizeIncrease) {
  return { fontSizeIncrease };
}

@action setCategoryFilter(categoryFilter) {
  return {categoryFilter};
  }
}



/*
const initialState = {
  navigatorPosition: "is-aside",
  navigatorShape: "open",
  navigatorFilter: "",
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: "all posts"
};
*/