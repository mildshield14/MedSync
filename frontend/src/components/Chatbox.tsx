import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/Chatbot.scss";
import Scene from "../Scene.jsx";

const ChatbotFullScreen: React.FC = () => {
    const navigate = useNavigate();

    const closeChat = () => {
        // Navigate back to home (or your desired route)
        navigate("/home");
    };

    return (
        <div className="chatbot-fullscreen">
            <div className="chatbot-header">
                <button className="chatbot-close" onClick={closeChat}>
                    ×
                </button>
            </div>
            <div className="chatbot-content">
                <Scene />
            </div>
        </div>
    );
};

export default ChatbotFullScreen;
