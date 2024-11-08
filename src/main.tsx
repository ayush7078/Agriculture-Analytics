import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
