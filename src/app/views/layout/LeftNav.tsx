import * as React from 'react';
import { withStyles, Paper} from 'material-ui';
import { AccountBalanceWallet, Cloud, Dashboard, HelpOutline, Settings, SwapHoriz } from '@material-ui/icons';

import { DrawerItem } from './DrawerItem';


const leftNavStyles: React.CSSProperties = {
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
  leftNav: leftNavStyles,
  leftNavInvert: {
    ...leftNavStyles,
    backgroundColor: theme.palette.secondary[50]
  }
})

type LeftNavProps = {
  classes?: any,
  invert?: any
}

const _LeftNav = (P: LeftNavProps) => (
<React.Fragment>
<Paper className={P.invert ? P.classes.leftNavInvert : P.classes.leftNav} >
              <DrawerItem route="/" icon={<Dashboard />} />
              <DrawerItem route="/trades" icon={<SwapHoriz />} />
              <DrawerItem route="/wallets" icon={<AccountBalanceWallet />} />
              <DrawerItem route="/exchanges" icon={<Cloud />} />
              <DrawerItem route="/settings" icon={<Settings />} />
              <DrawerItem route="/about" icon={<HelpOutline />} />
</Paper>
</React.Fragment> 
);

const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
export {LeftNav as default, LeftNav}


// add "label" if you want to use text ie: <DrawerItem label="Portfolio" route="/" icon={<Dashboard />} />
