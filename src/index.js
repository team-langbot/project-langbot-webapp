import React from 'react'; // React
import ReactDOM from 'react-dom/client'; // React library to talk to web broswers
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify, API } from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

const getData = async () => {
  const data = await API.get('projectLangbotApi', '/text')
  console.log(data)
  return data
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
