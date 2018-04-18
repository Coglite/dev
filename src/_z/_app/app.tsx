// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Router } from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
import Reboot from "material-ui/Reboot"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { StoreRoot } from "./stores/storeRoot"
import { ThemeProvider } from "react-jss"
import { Provider, observer } from "mobx-react"

// enable MobX strict mode
useStrict(true)

interface IRootType {
  history: SynchronizedHistory
}

export const storeRoot = new StoreRoot()

@observer
export class App extends React.Component<IRootType, {}> {
  render() {
    const theme = storeRoot.uiStore.muiTheme
    const rmwcPath = storeRoot.uiStore.rmwcPath
    const history = this.props.history
    return (
      <Provider store={storeRoot}>
        <ThemeProvider theme={theme}>
          <div id="rootBlock">
            <Reboot />
            <AppFrame>
              <Router history={history}>
                <Routes />
              </Router>
            </AppFrame>
            <link rel="stylesheet" type="text/css" href={rmwcPath} />
            <link rel="stylesheet" type="text/css" href="assets/coglite-base.css" />
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}
