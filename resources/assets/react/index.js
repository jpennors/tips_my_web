import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// ReactDOM.render(<p>C'estmoi</p>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
