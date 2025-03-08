import React, { useState } from 'react'
import axios from 'axios'
import './scss/ChatbotWidget.scss'

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

const ChatbotWidget: React.FC = () => {
    const [userMessage, setUserMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return

        try {
            // Call your backend endpoint
            const response = await axios.post('http://localhost:8080/api/chat', {
                message: userMessage,
            })

            const botReply = response.data.reply

            setChatHistory((prev) => [
                ...prev,
                { role: 'user', content: userMessage },
                { role: 'assistant', content: botReply },
            ])
            setUserMessage('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="chatbot">
            <div className="chatbot__history">
                {chatHistory.map((msg, index) => (
                    <p key={index} className={`chat-message ${msg.role}`}>
                        <strong>{msg.role}:</strong> {msg.content}
                    </p>
                ))}
            </div>
            <div className="chatbot__input">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask something..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatbotWidget
