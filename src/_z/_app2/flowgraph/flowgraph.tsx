import * as React from 'react'
import {withRouter} from 'react-router-dom'
import Canvas from './diagram'


class _FlowgraphPage extends React.Component<any, any> {
 render() {
    return ( 
    <React.Fragment>
        <div><Canvas/></div>
    </React.Fragment>
  )
 }
}

export let FlowgraphPage = withRouter(_FlowgraphPage)