import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app_container'));

serviceWorker.unregister();
