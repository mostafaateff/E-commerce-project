import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <Toaster/>
        <App />
      </TokenContextProvider>
    </QueryClientProvider>
    
  </>
);
reportWebVitals();
