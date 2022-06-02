import React from 'react';
import { render } from 'react-dom';

import store from './store';
import app from '@magento/peregrine/lib/store/actions/app';
import Adapter from '@magento/venia-ui/lib/components/Adapter';
import { registerSW } from './registerSW';
import './index.css';
import App from '@magento/venia-ui/lib/components/App';
import HelloWorld from './HelloWorld/helloWorldContainer';
import { TestProvider } from './context/testContext';

// server rendering differs from browser rendering
const isServer = !globalThis.document;

// TODO: on the server, the http request should provide the origin
const origin = isServer
    ? process.env.MAGENTO_BACKEND_URL
    : globalThis.location.origin;

// on the server, components add styles to this set and we render them in bulk
const styles = new Set();

const tree = (
    <Adapter origin={origin} store={store} styles={styles}>
        {/* <HelloWorld username="Magebit"/> */}
        <TestProvider>
            <HelloWorld />
            <App />
        </TestProvider>
    </Adapter>
   );

if (isServer) {
    // TODO: ensure this actually renders correctly
    import('react-dom/server').then(({ default: ReactDOMServer }) => {
        console.log(ReactDOMServer.renderToString(tree));
    });
} else {
    render(tree, document.getElementById('root'));
    registerSW();

    globalThis.addEventListener('online', () => {
        store.dispatch(app.setOnline());
    });
    globalThis.addEventListener('offline', () => {
        store.dispatch(app.setOffline());
    });
}
