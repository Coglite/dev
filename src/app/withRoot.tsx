import { create } from 'jss';
import CssBaseline from 'material-ui/CssBaseline';
import { createMuiTheme as MUITHEME, jssPreset, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

import { theme } from './style/theme';

//gotem coach
var createMuiTheme: any = MUITHEME

// Create a JSS instance with the default preset of plugins(optional).
const jss = create(jssPreset());


function withRoot(Component) {
  function WithRoot(props) {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithRoot;
}

export {withRoot as default, withRoot};