import 'reflect-metadata';
import * as React from "react";
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import { css } from "glamor";
import { CssBaseline, MuiThemeProvider } from 'material-ui';

import theme from './theme';
import { AppLayout } from './components/app/AppLayout';




//import RouterStore from '../../stores/RouterStore';
const stores = {
  //router: new RouterStore(),
};



class _CogliteRoot extends React.Component {
    public render(): JSX.Element {
        return (
          <Provider {...stores}>
              <MuiThemeProvider theme={theme}>
              <CssBaseline/>
                <HashRouter>
                <AppLayout/>
                </HashRouter>
              </MuiThemeProvider>
          </Provider>
        );
    }
}

export let CogliteRoot = hot(module)(_CogliteRoot)

//import "glamor/reset" // CSS reset

css.global("html, body, root", {
  userSelect: "none",  // turn off text highlighting
  cursor: "default",  // reset the cursor pointer
  font: "caption",
  WebkitFontSmoothing: "subpixel-antialiased",
  textRendering: "optimizeLegibility",
  height:  '100%',
  margin:  '0px auto',
  padding: '0px auto',
  overflow: 'hidden'
})


document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

