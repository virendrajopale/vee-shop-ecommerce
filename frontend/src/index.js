import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider,} from 'react-redux'
import store from './store'
import {positions, backgroundColor,transitions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import CustomAlertTemplate from './components/User/CustomAlertTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));
const options={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.FADE,
  // backgroundColor:"red"
}
root.render(
  <Provider store={store}>
    <AlertProvider  template={CustomAlertTemplate} {...options} >

    <App />
    </AlertProvider>
    
  </Provider>

);
