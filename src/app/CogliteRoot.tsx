import 'reflect-metadata'
import * as React from "react"
import { css } from "glamor"
import { Provider } from 'mobx-react';
import { AppLayout } from './views/app/AppLayout';
import { HashRouter } from 'react-router-dom';
import { PageRoutes} from './views/pages'

//import theme from './theme';


import { StoreRoot } from "./stores/storeRoot"
import { ThemeProvider } from "react-jss"
import { observer } from "mobx-react"

import { SynchronizedHistory } from "mobx-react-router"
interface AppProps {history: SynchronizedHistory}

export const storeRoot = new StoreRoot()


@observer
class _CogliteRoot extends React.Component<AppProps, any> {
    public render(): JSX.Element {
    const theme = storeRoot.uiStore.muiTheme
    //const rmwcPath = storeRoot.uiStore.rmwcPath
        return (
          <Provider store={storeRoot}>
              <ThemeProvider theme={theme}>
                <div>
                <HashRouter>
                <AppLayout>          
                    <PageRoutes/>
                </AppLayout>
                </HashRouter>
                </div>
              </ThemeProvider>
          </Provider>
        );
    }
}

export let CogliteRoot = _CogliteRoot

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

