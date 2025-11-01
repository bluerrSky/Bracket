// hooks/useOnlineCounter.js

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// IMPORTANT: Get the API base URL from the environment (Vite/CRA)
// Replace 'VITE_API_BASE_URL' if you are using a different prefix (e.g., REACT_APP_API_BASE_URL)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useOnlineCounter = () => {
    // Start with 1 as a sensible default, or 0
    const [onlineCount, setOnlineCount] = useState(1); 

    useEffect(() => {
        // Fallback if the environment variable isn't configured
        if (!API_BASE_URL) {
            console.error("API_BASE_URL is missing. Cannot connect to Socket.IO.");
            return;
        }

        // 1. Establish the connection to your backend
        const socket = io(API_BASE_URL, {
            // Note: If you use cookies/sessions, you might need to configure credentials: true here
        });

        // 2. Listen for the update event from the server
        socket.on('online_count_update', (count) => {
            setOnlineCount(count);
        });

        // 3. Cleanup function: disconnect the socket when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []); // Run only once on mount

    return onlineCount;
};

export default useOnlineCounter;