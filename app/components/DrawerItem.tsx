import { ListItem, ListItemIcon, ListItemText } from 'material-ui';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  icon: any; // TODO Add correct type
  label: string;
  route: string;
}

export function DrawerItem({ icon, label, route, ...props }: Props) {
  return (
    <ListItem button component={props => <NavLink {...props as any} exact to={route} />}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}
