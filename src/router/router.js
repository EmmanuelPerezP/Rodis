
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../components/app/app';
import registerServiceWorker from '../registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

class Router extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default Router;
