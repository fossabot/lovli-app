import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Reboot from 'material-ui/Reboot';
import { LovliGreen, LovliBlue, LovliRed } from '../utils/colors';


const theme = createMuiTheme({
  palette: {
    primary: LovliBlue,
		secondary: LovliGreen,
    error: LovliRed,
  },
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
