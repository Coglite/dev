import 'reflect-metadata'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { css } from "glamor"


import { Provider } from 'mobx-react';
import { MuiThemeProvider, CssBaseline } from 'material-ui';
import theme from './theme';
import {CogliteAppRouter} from './router';

import RouterStore from './stores/RouterStore';

const stores = {
  router: new RouterStore(),
};


ReactDOM.render(
  <Provider {...stores}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <CogliteAppRouter />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);





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

