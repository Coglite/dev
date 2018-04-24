// This is the top-most component in the app.
import * as React from "react"
import { Router } from "react-router"
import CssBaseline from "material-ui/CssBaseline"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { ThemeProvider } from "react-jss"
import { Provider, observer } from "mobx-react"

import { cogStore, ICogStore } from "./stores"

export const AppView = observer((props: ICogStore) => {
  const { ...muiTheme } = props.uiStore.muiTheme
  const { ...history } = props.history
  return (
    <Provider store={cogStore}>
      <ThemeProvider theme={muiTheme}>
        <div id="rootBlock">
          <CssBaseline />
          <AppFrame>
            <Router history={history}>
              <Routes />
            </Router>
          </AppFrame>
        </div>
      </ThemeProvider>
    </Provider>
  )
})
