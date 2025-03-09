import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/Chatbot.scss";

const ChatbotWidget: React.FC = () => {
    const navigate = useNavigate();

    const openChat = () => {
        // Navigate to the full-screen chatbot view.
        navigate("/chatbot");
    };

    return (
        <div className="chatbot-widget">
            <div className="chatbot-bubble" onClick={openChat}>
                💬
            </div>
        </div>
    );
};

export default ChatbotWidget;
