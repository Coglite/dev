import * as React from "react"
import { Router } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Provider, observer } from "mobx-react"
import CssBaseline from "material-ui/CssBaseline"
import { ThemeProvider } from "react-jss"

import { cogStore, ICogStore } from "./stores"

export const AppView = observer((props: ICogStore) => {
  const { ...muiTheme } = props.uiStore.muiTheme
  const { ...history } = props.history
  return (
    <Provider store={cogStore}>
      <ThemeProvider theme={muiTheme}>
        <div>
          <CssBaseline />
          <div className="fill-parent">
            <Router history={history}>
              <AppRoutes />
            </Router>
          </div>
        </div>    
      </ThemeProvider>
    </Provider>
  )
})

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())
