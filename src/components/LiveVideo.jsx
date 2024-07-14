import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaTimes, FaCamera } from "react-icons/fa";

export const LiveVideo = () => {
    const appId = import.meta.env.VITE_AGORA_APP_ID;
    const { channelName } = useParams();
    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(false);
    const [cameraOn, setCamera] = useState(false);
    const [remoteUserState, setRemoteUserState] = useState({});
    const [fullScreenUser, setFullScreenUser] = useState(null);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    const navigate = useNavigate();

    useJoin({
        appid: appId,
        channel: channelName,
        token: null,
    }, activeConnection);

    usePublish([micOn ? localMicrophoneTrack : null, cameraOn ? localCameraTrack : null]);

    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    useEffect(() => {
        audioTracks.forEach((track) => {
            track.play();
        });
    }, [audioTracks]);

    useEffect(() => {
        if (localCameraTrack) {
            localCameraTrack.setEnabled(cameraOn);
        }
        if (localMicrophoneTrack) {
            localMicrophoneTrack.setEnabled(micOn);
        }
    }, [localCameraTrack, cameraOn, localMicrophoneTrack, micOn]);

    const toggleRemoteUserMic = (user) => {
        const currentState = remoteUserState[user.uid] || { micOn: true, cameraOn: true };
        const updatedState = { ...currentState, micOn: !currentState.micOn };
        setRemoteUserState({ ...remoteUserState, [user.uid]: updatedState });

        if (updatedState.micOn) {
            user.audioTrack && user.audioTrack.play();
        } else {
            user.audioTrack && user.audioTrack.stop();
        }
    };

    const toggleRemoteUserCamera = (user) => {
        const currentState = remoteUserState[user.uid] || { micOn: true, cameraOn: true };
        const updatedState = { ...currentState, cameraOn: !currentState.cameraOn };
        setRemoteUserState({ ...remoteUserState, [user.uid]: updatedState });

        if (updatedState.cameraOn) {
            user.videoTrack && user.videoTrack.play();
        } else {
            user.videoTrack && user.videoTrack.stop();
        }
    };

    return (
        <div className="main-container relative min-h-screen min-w-screen bg-gray-900 text-white">

            {/* // Remote Video Grid */}
            <div className={`w-full h-full flex items-start justify-center gap-3 flex-wrap pt-8`}>
                {
                    fullScreenUser ?
                        <div className="fixed inset-0 bg-black flex items-center justify-center" onClick={() => setFullScreenUser(null)}>
                            <RemoteUser
                                audioTrack={fullScreenUser.audioTrack}
                                videoTrack={fullScreenUser.videoTrack}
                                cameraOn={true}
                                micOn={true}
                                user={fullScreenUser}
                            />
                        </div>
                        : remoteUsers.map((user) => {
                            const { micOn = true, cameraOn = true } = remoteUserState[user.uid] || {};
                            return (
                                <div key={user.uid} className="relative remote-video-container rounded-lg overflow-hidden border border-gray-600 cursor-pointer" onClick={() => setFullScreenUser(user)}>
                                    {
                                        cameraOn ? <RemoteUser
                                            audioTrack={user.audioTrack}
                                            videoTrack={user.videoTrack}
                                            cameraOn={cameraOn}
                                            micOn={micOn}
                                            user={user}
                                        /> : <div className="flex justify-center items-center h-full">
                                            <FaCamera className="text-gray-400 w-16 h-16" />
                                        </div>
                                    }


                                </div>
                            );
                        })
                }
            </div>

            {/* Local Video */}
            <div className="absolute bottom-4 right-2 bg-gray-100 rounded-lg shadow-lg p-2 w-56 md:w-80 aspect-[16/9]">
                {cameraOn ? (
                    <LocalUser
                        audioTrack={null}
                        videoTrack={localCameraTrack}
                        cameraOn={cameraOn}
                        micOn={micOn}
                        playAudio={false}
                        playVideo={cameraOn}
                        className="rounded-lg"
                    />
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <FaCamera className="text-gray-400 w-16 h-16" />
                    </div>
                )}
            </div>

            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                <button
                    className={`flex items-center p-2 rounded ${micOn ? "bg-blue-500" : "bg-red-500"} text-white rounded-full`}
                    onClick={() => setMic((a) => !a)}
                >
                    {micOn ? <FaMicrophone className="m-1" /> : <FaMicrophoneSlash className="m-1" />}
                </button>
                <button
                    className={`flex items-center p-2 rounded ${cameraOn ? "bg-blue-500" : "bg-red-500"} text-white rounded-full`}
                    onClick={() => setCamera((a) => !a)}
                >
                    {cameraOn ? <FaVideo className="m-1" /> : <FaVideoSlash className="m-1" />}
                </button>
                <button
                    className="bg-red-500 text-white rounded-full p-2"
                    onClick={() => {
                        setActiveConnection(false);
                        navigate("/");
                    }}
                >
                    <FaTimes className="m-1" />
                </button>
            </div>
        </div>
    );
};
