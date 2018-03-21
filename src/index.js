import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyAJDQHR_PpagESd4P7Bf9_mj8s7jEebZUE",
  authDomain: "pseudogram-1c3e7.firebaseapp.com",
  databaseURL: "https://pseudogram-1c3e7.firebaseio.com",
  projectId: "pseudogram-1c3e7",
  storageBucket: "pseudogram-1c3e7.appspot.com",
  messagingSenderId: "86316011285"
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
