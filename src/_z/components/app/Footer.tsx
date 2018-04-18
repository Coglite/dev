import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Paper } from 'material-ui';

const version = '0.0.1';

const copyrightString = '© Copyright Coglite 2018';

const footerStyle: React.CSSProperties = {
  height: '25px',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  bottom: '0',
  position: "absolute",
  alignItems: 'center'
};

const footerCopyRightStyle: React.CSSProperties = {position:'absolute',left: '10px'};
const footerVersionStyle: React.CSSProperties = {position: 'absolute',right: '10px'};

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
  <Paper className={P.invert ? P.classes.invertFooter : P.classes.footer} >
    <Typography variant="caption">
    <span className={P.classes.footerCopyright}>{copyrightString}</span>
    <span className={P.classes.footerVersion}>{`Version: ${version || 'pre-release'}`}</span>
    </Typography>
  </Paper>
);


const Footer = withStyles(styles, {withTheme: true})(FooterBase);
export {Footer as default, Footer}

