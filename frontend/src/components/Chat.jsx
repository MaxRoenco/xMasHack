import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import KikiSection from './KikiSection';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        // Get or generate conversation ID
        const storedId = localStorage.getItem('conversationId') ||
            `conversation-${Date.now()}`;
        setConversationId(storedId);
        localStorage.setItem('conversationId', storedId);
        loadHistory(storedId);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadHistory = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/history/${id}`);
            const data = await response.json();
            setMessages(data.messages.map(msg => ({
                content: msg.content,
                isUser: msg.role === 'user'
            })));
        } catch (error) {
            console.error('Error loading history:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { content: inputMessage, isUser: true }]);
        setInputMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: inputMessage,
                    conversation_id: conversationId
                })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { content: data.message, isUser: false }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                content: 'Sorry, there was an error processing your message. Please try again.',
                isUser: false
            }]);
            console.error('Error:', error);
        }

        setIsLoading(false);
        inputRef.current?.focus();
    };

    const clearChat = async () => {
        try {
            await fetch(`http://127.0.0.1:5000/clear/${conversationId}`, {
                method: 'POST'
            });

            const newId = `conversation-${Date.now()}`;
            setConversationId(newId);
            localStorage.setItem('conversationId', newId);
            setMessages([]);
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">
                <div className="bg-purple-600 p-4 rounded-t-xl flex justify-between items-center">
                    <span className="text-white font-bold text-lg">AI Chat Assistant</span>
                    <button
                        onClick={clearChat}
                        className="px-4 py-2 text-sm text-white border border-white rounded-lg 
                     hover:bg-white/10 transition-colors"
                    >
                        Clear Chat
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`max-w-[70%] p-3 rounded-2xl mb-2 animate-fade-in
                ${message.isUser ?
                                    'ml-auto bg-purple-600 text-white rounded-br-sm' :
                                    'mr-auto bg-gray-100 text-gray-800 rounded-bl-sm'
                                }`}
                        >
                            {message.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="max-w-[70%] p-3 rounded-2xl mb-2 bg-gray-100 text-gray-800 rounded-bl-sm">
                            <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            className="flex-1 p-3 border border-gray-200 rounded-lg focus:border-purple-600 
                       focus:outline-none transition-colors"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg
                       hover:bg-purple-700 transition-colors disabled:bg-gray-400 
                       disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;