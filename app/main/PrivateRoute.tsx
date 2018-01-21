import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { settingsService } from '../services/settings.service';

export const PrivateRoute = ({ component: Component, ...rest }: {component: any, path: string, exact?: boolean}) => (
    <Route {...rest} render={props => (
        settingsService.get('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
