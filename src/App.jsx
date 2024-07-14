// import React, { useState } from 'react';
// import AgoraUIKit from 'agora-react-uikit';
// import { FaVideo, FaPhoneSlash } from 'react-icons/fa';
// import { useMediaQuery } from 'react-responsive';

// const App = () => {
//   const [videoCall, setVideoCall] = useState(false);
//   const rtcProps = {
//     appId: import.meta.env.VITE_AGORA_APP_ID, // your agora app id
//     channel: 'test', // your agora channel
//     token: null // use null or skip if using app in testing mode
//   };

//   const isMobile = useMediaQuery({ maxWidth: 767 })
//   const videoContainerCss = {
//     width: '100vw',
//     height: '100vh',
//     display: 'flex',
//   };


//   const callbacks = {
//     EndCall: () => setVideoCall(false),
//   };
//   return videoCall ? (
//     <div style={videoContainerCss}>
//       <AgoraUIKit
//         rtcProps={rtcProps} callbacks={callbacks} />
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center ">
//       <FaVideo className="text-6xl text-blue-600 mb-4" />
//       <h3
//         className="text-2xl font-semibold text-blue-600 cursor-pointer hover:text-blue-700"
//         onClick={() => setVideoCall(true)}
//       >
//         Start Call
//       </h3>
//     </div>
//   );
// };

// export default App;
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ConnectForm } from './components/ConnectForm'
import { LiveVideo } from './components/LiveVideo'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

import './App.css'

function App() {
  const navigate = useNavigate()
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  const handleConnect = (channelName) => {
    navigate(`/via/${channelName}`) // on form submit, navigate to new route
  }

  return (
    <Routes>
      <Route path='/' element={<ConnectForm connectToVideo={handleConnect} />} />
      <Route path='/via/:channelName' element={
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
      } />
    </Routes>
  )
}

export default App
