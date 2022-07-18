import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./state/store";

// Add request interceptor
axios.interceptors.request.use((config) => {
  // Add csrftoken (if it exists) to the request before it is sent
  const csrftoken = Cookies.get("csrftoken");

  if (csrftoken) {
    config.headers["X-CSRFToken"] = csrftoken;
  }
  
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
