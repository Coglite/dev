import * as React from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { LeftNav } from "./LeftNav"
import { withRouter } from "react-router-dom"
//import {PageRoutes} from '../pages'

class _AppLayout extends React.Component<any, any> {
  render() {
    return (
      <div style={{ display: "flex" }}>
        {() => LeftNav}
        <Header />
        <div style={{ marginLeft: "64px", marginTop: 50 }}>{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

export let AppLayout = withRouter(_AppLayout)
