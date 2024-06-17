import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// css
import './css/board.css';
import './css/layout.css';
import './css/user.css';

// base css
import './css/base/font.css';
import './css/base/reset.css';
import './css/base/common.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {HelmetProvider} from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>
  // <React.StrictMode>
  //
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
