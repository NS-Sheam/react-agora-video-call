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
import { Outlet, } from 'react-router-dom'

function App() {


  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
