import * as React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {LeftNav} from './LeftNav'
import { Paper } from 'material-ui';


export let AppLayout = (...props) => {
    return ( 
        <div style={{display: 'flex'}}>
            <LeftNav/>
            <div style={{marginLeft: '64px'}}>
            <Header />
             <div style={{marginTop: 50}}>hii</div>           
            </div>
            <Paper><Footer /></Paper>
        </div>
 )
}