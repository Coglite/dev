import { create } from 'jss';
import green from 'material-ui/colors/green';
import purple from 'material-ui/colors/purple';
import CssBaseline from 'material-ui/CssBaseline';
import { createGenerateClassName, createMuiTheme as MUITHEME, jssPreset, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';

var createMuiTheme: any = MUITHEME
// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  primary: {
    light: purple[300],
    main: purple[500],
    dark: purple[700],
  },
  secondary: {
    light: green[300],
    main: green[500],
    dark: green[700],
  },
});

// Create a JSS instance with the default preset of plugins.
// It's optional.
const jss = create(jssPreset());

// The standard class name generator.
// It's optional.
const generateClassName = createGenerateClassName();

function withRoot(Component) {
  function WithRoot(props) {
    // JssProvider allows customizing the JSS styling solution.
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        {/* MuiThemeProvider makes the theme available down the React tree
          thanks to React context. */}
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithRoot;
}

export {withRoot as default, withRoot};