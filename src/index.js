import { CircularProgress } from "@material-ui/core";
import React from "react";

import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import Lazyload from "./Lazyload";
const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.Suspense
    fallback={
      <CircularProgress
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
        }}
      />
    }
  >
    <CookiesProvider CookiesProvider>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </CookiesProvider>
  </React.Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
