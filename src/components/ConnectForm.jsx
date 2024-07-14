import { useState } from "react";

export const ConnectForm = ({ connectToVideo }) => {
    const [channelName, setChannelName] = useState('');
    const [invalidInputMsg, setInvalidInputMsg] = useState('');

    const handleConnect = (e) => {
        e.preventDefault();
        const trimmedChannelName = channelName.trim();

        if (trimmedChannelName === '') {
            setInvalidInputMsg("Channel name can't be empty.");
            setChannelName('');
            return;
        }

        connectToVideo(trimmedChannelName);
    };

    const generateRandomChannelName = () => {
        const randomChannel = Math.random().toString(36).substring(2, 15);
        connectToVideo(randomChannel);
    };

    return (
        <form onSubmit={handleConnect} className="flex justify-center items-center h-screen">
            <div className="card bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Channel Name"
                    value={channelName}
                    onChange={(e) => {
                        setChannelName(e.target.value);
                        setInvalidInputMsg('');
                    }}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Connect
                </button>
                {invalidInputMsg && <p className="text-red-500 text-sm mt-2">{invalidInputMsg}</p>}
                <button
                    type="button"
                    onClick={generateRandomChannelName}
                    className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 transition-colors"
                >
                    Create Instant Meeting
                </button>
            </div>
        </form>
    );
};
