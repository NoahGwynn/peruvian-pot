import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import SiteProvider from "./dataManagement/providers/SiteProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <SiteProvider>
            <App/>
        </SiteProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
;