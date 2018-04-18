import * as React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {LeftNav} from './LeftNav'
import {withRouter} from 'react-router-dom'

import { cogWrap, IStyledProps } from "../utils/sharedUtil"

//import {PageRoutes} from '../pages'




class _AppLayout extends React.Component<IStyledProps, any> {
 render() {
    const {classes} = this.props
    return (
        <div className={classes.root}> 
        <div style={{display: 'flex'}}>
            <LeftNav/>
            <Header />
            <div style={{marginLeft: '64px',marginTop: 50 }}>  
             {this.props.children}   
            </div>
            <Footer/>
        </div>
        </div>
  )
 }
}

export let AppLayout = withRouter(cogWrap(_AppLayout, {}, true))