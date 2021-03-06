import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../../main/reducer';

import * as toolActions from '../../tools/actions';
import * as userActions from '../../users/actions';
import { Store } from 'redux';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

const actionCreators = Object.assign({},
	toolActions,
	userActions,
  {push}
);

const logger = (<any>createLogger)({
  level: 'info',
  collapsed: true
});

const history = createHashHistory();
const router = routerMiddleware(history);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators
  }) as any :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

export = {
  history,
  configureStore(initialState: Object | void) {
    const store: Store<any> = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
      module.hot.accept('../../main/reducer', () =>
        store.replaceReducer(require('../../main/reducer')) // eslint-disable-line global-require
      );
    }

    return store;
  }
};
