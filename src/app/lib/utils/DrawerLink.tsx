import { ListItem, ListItemIcon, ListItemText } from "material-ui"
import * as React from "react"
import { NavLink , withRouter} from "react-router-dom"
import {observer} from 'mobx-react'

interface Props {
  route: string
  icon?: any
  label?: string
}

export let DrawerLink: JSX.Element = withRouter(observer(({ icon, label, route }: Props) => 
    <ListItem button component={props => <NavLink {...props as any} exact to={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
)