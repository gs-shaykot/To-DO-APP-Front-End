import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from './Layout/MainLayout.jsx';
import HomePage from './Layout/HomePage.jsx';
import ThemeProvider from './Provider/ThemeProvider.jsx';
import Login from './Page/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoute from './Route/PrivateRoute';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [ 
      {
        path: '/',
        element: <PrivateRoute><HomePage /></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);