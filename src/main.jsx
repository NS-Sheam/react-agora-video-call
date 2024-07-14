import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConnectForm } from './components/ConnectForm.jsx'
// const router = createBrowserRouter[
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/:channelName',
//     element: <ConnectForm handleConnect={handleConnect} />,
//   }
// ]
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    {/* <App /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
