import React, { useState } from 'react';
// import './PromptInput.scss';

export default function PromptInput() {
    const [input, setInput] = useState('');

    const handleChange = (e) => setInput(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Input:', input);
        setInput('');
    };

    return (
        <div className="prompt-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Type something..."
                />
            </form>
        </div>
    );
};