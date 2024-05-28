import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from '@mantine/core';
import App from "./App";
import { Provider } from 'react-redux';
import store from "./redux/store.js";

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider>
      <App/>
    </MantineProvider>
  </Provider>,
  document.getElementById("root")
);


