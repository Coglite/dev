import * as React from 'react'
import {Footer} from './Footer'
import {Header} from './Header'
import {LeftNav} from './sidebar'
import { Paper } from 'material-ui';


export let Home = (...props) => {
    return ( 
        <div style={{display: 'flex'}}>
            <LeftNav/>
            <div style={{marginLeft: '64px'}}>
            <Header />
             <div style={{marginTop: 50}}>hi</div>           
            </div>
            <Paper><Footer /></Paper>
        </div>
 )
}