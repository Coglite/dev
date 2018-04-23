// This is the top-most component in the app.
import * as React from "react"
import { Router } from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
import Reboot from "material-ui/Reboot"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { StoreRoot } from "./stores/storeRoot"
import { ThemeProvider } from "react-jss"
import { Provider, observer } from "mobx-react"


interface IRootType {
  history: SynchronizedHistory
}

export const storeRoot = new StoreRoot()

@observer
export class App extends React.Component<IRootType, {}> {
  render() {
    const theme = storeRoot.uiStore.muiTheme
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
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}
