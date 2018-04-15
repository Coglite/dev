import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

export const mount = (Component: React.ComponentType, componentPath: string) => {

    const container = document.getElementById('root');

    const render = () => {
        hot(module)(Component)
        ReactDOM.render(<Component/>, container);
    };

    render();

    if ((module as any).hot) {
        (module as any).hot.accept(componentPath, render);
    }
};
