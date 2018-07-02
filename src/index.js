import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/router';

// import redux libraries
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import reducers to sync with the store from redux
import rootReducer from './reducers/index';


// create store
const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Router/>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
