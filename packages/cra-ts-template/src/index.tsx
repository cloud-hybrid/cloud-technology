import React from "react";
import ReactDOM from "react-dom";

import { default as Application } from "./App";
import { default as Vitals } from "./Vitals";

import "./index.css";

const Index = () => {
    return (
        <React.StrictMode>
            <Application/>
        </React.StrictMode>
    );
};

ReactDOM.render(
    (<Index/>), document.getElementById("$")
);

Vitals(console.debug);
