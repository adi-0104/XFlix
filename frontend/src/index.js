import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"
// import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from "notistack";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import dark from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            preventDuplicate
          >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
