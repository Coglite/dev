import * as React from 'react'           

//import { ComponentKitConfig } from '../../stores/config/ComponentKitConfig';                  
                   
export function InstalledPluginPanel({...children}) {
return(
<table className='pt-table pt-condensed pt-bordered'>
    <tbody>
        {children}
    </tbody>
</table>
)}


export function UninstalledPluginPanel({...children}){
return(
<table className='pt-table pt-condensed pt-bordered'>
    <tbody>
        {children}
    </tbody>
</table>
)}
