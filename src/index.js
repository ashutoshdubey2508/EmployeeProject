import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);

reportWebVitals();
