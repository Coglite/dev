import * as React from "react"
import { Router } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Provider, observer } from "mobx-react"
import { vertical, fillParent, content, height, flex, horizontal, width } from "csstips"
import { style } from "typestyle"
import { cogStore, ICogStore } from "./stores"

//import {Footer} from './components/layout/Footer'
import { Header } from "./Header"

export const xAppView = observer((props: ICogStore) => {
  const { ...history } = props.history
  return (
    <Provider store={cogStore}>
      <div className={style(fillParent, vertical)}>
        <div className={style(content, height(50))}>Header</div>
        <div className={style(flex, horizontal)}>
          <div className={style(content, width(100))}>Sidebar</div>
          <div id="coglite-platform-root" className={style(flex)}>
            <Router history={history}>
              <AppRoutes />
            </Router>
          </div>
          <div className={style(content, width(100))}>Right Sidebar</div>
        </div>
        <div className={style(content, height(50))}>Footer</div>
      </div>
    </Provider>
  )
})

export const AppView = observer((props: ICogStore) => {
  const { ...history } = props.history
  return (
    <Provider store={cogStore}>
      <div className={style(fillParent)}>
        <Header />
        <div id="coglite-platform-root" className={style(flex)}>
          <Router history={history}>
            <AppRoutes />
          </Router>
        </div>
      </div>
    </Provider>
  )
})

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())
