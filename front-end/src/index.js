import React from 'react';
import ReactDOM from 'react-dom';
import './skeleton/css/skeleton.css'
import './index.css';
import App from './App';
import NewToDo from './NewToDo'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
