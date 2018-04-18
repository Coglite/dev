import * as React from 'react';
import { withStyles, Paper} from 'material-ui';
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz,
DeviceHub } from '@material-ui/icons';

import { DrawerItem } from './DrawerItem';
import { withRouter } from 'react-router-dom';


const leftNavStyles = {
    width: 64,
    height: '100%',
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignmentBaseline: 'central'
};

const styles = theme => ({
  leftNav: leftNavStyles
  
})

type LeftNavProps = {
  classes?: any,
  invert?: any
}



const _LeftNav = (P: LeftNavProps) => (
<React.Fragment>
<Paper className={P.classes.leftNav} >
              <DrawerItem route="/" icon={<Dashboard />} />
              <DrawerItem route="/pages/notebook" icon={<SwapHoriz />} />
              <DrawerItem route="/pages/datasets" icon={<AccountBalanceWallet />} />
              <DrawerItem route="/pages/diagram" icon={<DeviceHub />} />
              <DrawerItem route="/pages/cloud" icon={<Cloud />} />
              <DrawerItem route="/pages/settings" icon={<Settings />} />
              <DrawerItem route="/pages/about" icon={<HelpOutline />} />
</Paper>
</React.Fragment> 
);

export const LeftNav = withRouter(withStyles(styles, {withTheme: true})(_LeftNav));



// add "label" if you want to use text ie: <DrawerItem label="Portfolio" route="/" icon={<Dashboard />} />
