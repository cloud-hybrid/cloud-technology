import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./Vitals";

import "./index.css";

const Application = () => {
    return (
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
};

ReactDOM.render(
    (<Application/>), document.getElementById("root")
);

reportWebVitals(console.debug);
