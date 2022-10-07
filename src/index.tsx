import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import './index.css';
import React from "react";
import MainApp from "./Construction";
const rerenderEntireTree=()=>{
    ReactDOM.render(
        <MainApp/>,
        document.getElementById('root')
    );
}
rerenderEntireTree();
reportWebVitals();








