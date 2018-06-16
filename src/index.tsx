
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './components/App';
import './styles/css/app.css';

const domElement: HTMLElement = document.getElementById('root');

ReactDOM.render((<App />), domElement);
