import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';


export class Root extends React.Component {

    public render(): JSX.Element {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/' component={AppLayout} />
                </Switch>
            </HashRouter>
        );
    }
}
