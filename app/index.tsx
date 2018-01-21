import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './main/Root';
import './app.global.scss';

const { configureStore, history } = require('./main/store/configureStore');
const store = configureStore();

// setup fake backend
import { configureFakeBackend } from './utils';
configureFakeBackend();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./main/Root', () => {
    const NextRoot = require('./main/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
