import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'dotenv/config' 


// AWS Config
// import * as AWS from 'aws-sdk'
// import { configuration } from './aws.config.ts'

// AWS.config.update(configuration)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    {/* <FirestoreProvider firebase={firebase} {...firebaseConfig}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </FirestoreProvider>, */}
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();