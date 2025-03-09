import React, { useState } from "react";
import App from "../App.jsx";
import "../scss/Chatbot.scss";

const ChatbotWidget: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="chatbot-widget">
            {/* Floating Chat Bubble */}
            {!isChatOpen && (
                <div className="chatbot-bubble" onClick={toggleChat}>
                    💬
                </div>
            )}

            {/* Full-Size Chatbot */}
            {isChatOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <span>Chatbot</span>
                        <button className="chatbot-close" onClick={toggleChat}>
                            ×
                        </button>
                    </div>
                    <div className="chatbot-content">
                        <App />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;