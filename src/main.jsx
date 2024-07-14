import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ConnectForm } from './components/ConnectForm.jsx';
import { AgoraRTCProvider } from 'agora-rtc-react';
import { LiveVideo } from './components/LiveVideo.jsx';
import AgoraRTC from "agora-rtc-react";

// Initialize Agora Client
const agoraClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });

const handleConnect = (channelName, navigate) => {
  navigate(`/via/${channelName}`);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ConnectForm connectToVideo={(channelName) => handleConnect(channelName, router.navigate)} />,
      },
      {
        path: '/via/:channelName',
        element: (
          <AgoraRTCProvider client={agoraClient}>
            <LiveVideo />
          </AgoraRTCProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
