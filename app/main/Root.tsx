import * as React from 'react';
import * as Redux from 'react-redux';
import { History } from 'history';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import { IntlProvider } from 'react-intl';
const locale='en';

interface IRootType {
  store: Redux.Store<any>;
  history: History
};

declare module 'material-ui/styles/createMuiTheme' {
  interface Theme {
    appBar: {
      color: 'red'
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appBar?: {
      color?: React.CSSProperties['color']
    }
  }
}
export default function Root({ store, history }: IRootType) {
  return (
    <Provider store={store}>
			    <IntlProvider locale={locale}>

      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
			</IntlProvider>
    </Provider>
  );
}
