import * as React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {LeftNav} from './LeftNav'
import { Paper } from 'material-ui';
import {withRouter} from 'react-router-dom'
//import {PageRoutes} from '../pages'


class _AppLayout extends React.Component<any, any> {
 render() {
    const {classes, children} = this.props
    return ( 
        <div style={{display: 'flex'}}>
            <LeftNav/>
            <div style={{marginLeft: '64px'}}>
            <Header />
             <div style={{marginTop: 50}}>
             {(children)}
             </div>           
            </div>
            <Paper><Footer/></Paper>
        </div>
  )
 }
}

export let AppLayout = withRouter(_AppLayout)