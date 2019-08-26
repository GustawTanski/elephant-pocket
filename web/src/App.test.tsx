import React from "react";
import ReactDOM from "react-dom";
import App from "./App"

describe("App", () => {
    it("should mount without errors", () => {
        const root : HTMLElement | null = document.createElement("div");
        ReactDOM.render(<App/>, root);
        ReactDOM.unmountComponentAtNode(root);
    })
})