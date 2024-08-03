import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from './Button';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Teresa from './Teresa';
import Form from './Form';
const root = ReactDOM.createRoot(document.getElementById('root'));
const baseUrl = '/';
root.render(
  <Router basename={baseUrl}>
<Routes>
  <Route path='/' element={<App/>}/>
  <Route path='/teresa' element={<Teresa/>}/>
  <Route path='/form' element={<Form/>}/>
</Routes>
  </Router>
  // <React.StrictMode>
    // <App />
    // {/* <Button/> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
