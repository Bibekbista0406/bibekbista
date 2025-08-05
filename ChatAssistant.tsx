import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageAuthor, ChatMessage } from '../types';
import { createChatSession, sendMessage } from '../services/geminiService';
import { CloseIcon, SendIcon, UserIcon, BotIcon } from './icons/Icons';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeyExists: boolean;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, apiKeyExists }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen) {
      createChatSession();
      if (!apiKeyExists) {
        setMessages([
          { author: MessageAuthor.AI, text: "Welcome! The AI assistant is currently offline because the API key is not configured. Please contact the site administrator." }
        ]);
      } else {
        setMessages([
          { author: MessageAuthor.AI, text: "Hello! I'm Bibek's AI assistant. How can I help you learn more about his work and skills today?" }
        ]);
      }
    }
  }, [isOpen, apiKeyExists]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !apiKeyExists) return;

    const userMessage: ChatMessage = { author: MessageAuthor.USER, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Add an empty AI message to stream into
    setMessages((prev) => [...prev, { author: MessageAuthor.AI, text: '' }]);

    try {
      const stream = await sendMessage(input);
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.author === MessageAuthor.AI) {
                const updatedMessages = [...prev.slice(0, -1)];
                updatedMessages.push({ ...lastMessage, text: lastMessage.text + chunkText });
                return updatedMessages;
            }
            return prev; // Should not happen
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const updatedMessages = [...prev.slice(0, -1)]; // remove the empty AI message
        updatedMessages.push({ author: MessageAuthor.AI, text: 'Sorry, I encountered an error. Please try again.' });
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, apiKeyExists]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="glassmorphic w-full max-w-lg h-[80vh] max-h-[700px] rounded-lg shadow-2xl shadow-sky-500/20 flex flex-col border border-slate-700">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="font-orbitron text-lg font-bold text-white flex items-center gap-2">
            <BotIcon className="w-6 h-6 text-sky-400" />
            AI Assistant
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.author === MessageAuthor.USER ? 'justify-end' : 'justify-start'}`}>
              {msg.author === MessageAuthor.AI && <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-sky-400"/></div>}
              <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${msg.author === MessageAuthor.USER ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                {msg.text}
                {isLoading && msg.author === MessageAuthor.AI && index === messages.length - 1 && <span className="inline-block w-2 h-4 bg-white ml-1 animate-ping"></span>}
              </div>
               {msg.author === MessageAuthor.USER && <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-slate-300"/></div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={apiKeyExists ? "Ask about Bibek..." : "AI Assistant is offline"}
              className="w-full p-3 rounded-md bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all disabled:opacity-50"
              disabled={isLoading || !apiKeyExists}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim() || !apiKeyExists} className="bg-sky-500 text-white p-3 rounded-md hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatAssistant;