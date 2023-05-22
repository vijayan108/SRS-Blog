import React, { useState } from 'react';
import axios from 'axios';

import './Chatbot.css';
import { Configuration, OpenAIApi } from 'openai';

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleChatbotClick = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
     model: "gpt-3.5-turbo",
     messages: [{"role": "user", "content": inputText}],
     temperature: 0.7
  
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50',
        },
      });
      
      setChatbotResponse(response.data.choices[0].message.content);
     
    } catch (error) {
      console.error(error);
    }

    
  };

  const handleChatbotToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseChatbot = () => {
    setIsOpen(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h1>Chatbot</h1>
            <button className="chatbot-toggle" onClick={handleCloseChatbot}>
              Close
            </button>
          </div>
          <div className="chatbot-body">
            {chatbotResponse && (
              <div className="chatbot-response">

                <p >{chatbotResponse}</p>
              </div>
            )}
            <div className="chatbot-input">
              <input type="text" value={inputText} onChange={handleInputChange} />
              <button onClick={handleChatbotClick}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbot-icon" onClick={handleChatbotToggle}>
          <img src="https://cdn0.iconfinder.com/data/icons/robot-avatar/512/Robot_Avatars_20-512.png" alt="Chatbot Icon" />
        </div>
      )}
    </div>
  );
}

export default Chatbot;
