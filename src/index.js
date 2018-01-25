import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BrowserRouter from './views';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter />, document.getElementById('root'));
registerServiceWorker();
