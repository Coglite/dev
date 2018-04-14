import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

const footerStyle: React.CSSProperties = {
  height: '25px',
  display: 'flex',
  flexDirection: 'row',
  widgth: '100%',
  bottom: '0',
  position: "fixed"
};

const footerCopyRightStyle: React.CSSProperties = {position:'fixed',left: '10px'}
const footerVersionStyle: React.CSSProperties = {position: 'fixed',right: '10px'}

const styles = theme => ({
  footer: footerStyle,
  invertFooter: {
    ...footerStyle,
    backgroundColor: theme.palette.secondary[50],
  },
  footerCopyRight: footerCopyRightStyle,
  footerVersion: footerVersionStyle,
  logo: {
    width: 140,
  }

});

type FooterProps = {
  classes?: any,
  invert?: any
}

const FooterBase = (P: FooterProps) => (
  <div className={P.invert ? P.classes.invertFooter : P.classes.footer} >
    <Typography variant="caption"><div className={P.classes.footerCopyright}>{copyrightString}</div></Typography>
    <Typography variant="caption"><div className={P.classes.footerVersion}>{`Version: ${version || 'pre-release'}`}</div></Typography>
  </div>
);


const Footer = withStyles(styles)(FooterBase);
export {Footer as default, Footer}


/*//style={{alignSelf: 'flex-end'}}
  <div className={invert ? classes.invertFooter : classes.footer} >
    <img className={classes.logo} src={logo} alt="other-Logo" />
    <Typography variant="caption" gutterBottom>{copyrightString}</Typography>
    <Typography variant="body1">{`Version: ${version || 'pre-release'}`}</Typography>
  </div>
  */