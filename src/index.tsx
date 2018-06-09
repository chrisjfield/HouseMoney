
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { load } from 'webfontloader';
import App from './components/App';
import './styles/css/app.css'; // TODO: Attempt removal of this! could actully have a working background

load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif'],
    },
});

const domElement: HTMLElement = document.getElementById('root');

ReactDOM.render((<App />), domElement);
