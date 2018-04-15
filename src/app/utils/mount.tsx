import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

export const mount = (Component: React.ComponentType, componentPath: string) => {

    const container = document.getElementById('root');

    const render = () => {
        const element = process.env.NODE_ENV === 'development'
            ? <AppContainer><Component /></AppContainer>
            : <Component />;
        ReactDOM.render(element, container);
    };

    render();

    if ((module as any).hot) {
        (module as any).hot.accept(componentPath, render);
    }
};
