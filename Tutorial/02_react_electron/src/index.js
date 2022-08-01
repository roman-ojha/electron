/*
  *> Setup:
    -> npx create-react-app <project_name>
    -> yarn add -D electron concurrently wait-on cross-env
    -> yarn add @electron/remote (to handle IPC)
    -> in package.json:
      "scripts": {
        "electron:serve": "concurrently -k \"cross-env BROWSER=none yarn start\" \"yarn electron:start\"",
        // cross-env will help us to not open react app on browser and then we will run 'electron:start'
        "electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js",
        // firstly we will build a react application after that we will build electron app
        // we also have to set the set the main entry point of the electron app (main.js) to point to build directory instead of a public/main.js folder
        "electron:start": "wait-on tcp:3000 && electron ."
        // wait-on package will help to wait until react start running on port 3000 & then start electron
      },
    -> after when electron run it will look into the package.json file for javascript entry point for that we will add this on package.json
      -> "main": "src/main/main.js",
        "homepage": "./",
    -> yarn electron:serve (to start electron with react)
  *) For Hot reload main process:
      -> yarn add -D electron-reloader
      -> add on main process file:
        -> if (isDev) {
              try {
                require("electron-reloader")(module);
                // for auto reload main process on change
              } catch (_) {}
            }
  
  *) Build App:
      -> yarn add -D electron-builder
      -> yarn add electron-is-dev
      -> yarn electron:build (for windows)
*/

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
