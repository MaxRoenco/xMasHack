import React, { useState, useEffect, useRef } from 'react';
import { Brain, Keyboard, Mouse, Monitor, FileCode, Terminal, Loader2, MessageCircle, Send } from 'lucide-react';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
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
            // Check if data is an array (assuming backend returns array directly)
            const messages = Array.isArray(data) ? data : [];
            setMessages(messages.map(msg => ({
                content: msg.content,
                isUser: msg.role === 'user'
            })));
        } catch (error) {
            console.error('Error loading history:', error);
            setMessages([]); // Set empty messages on error
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { content: inputMessage, isUser: true }]);
        setInputMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', {
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

    const decorativeElements = [
        { icon: Keyboard, position: 'top-20 left-20', rotation: '15deg', size: 48 },
        { icon: Mouse, position: 'top-40 right-20', rotation: '-10deg', size: 40 },
        { icon: Monitor, position: 'bottom-20 left-1/4', rotation: '5deg', size: 56 },
        { icon: FileCode, position: 'top-1/3 right-1/3', rotation: '-20deg', size: 44 },
        { icon: Terminal, position: 'bottom-40 right-1/4', rotation: '25deg', size: 48 }
    ];

    return (
        <div className="h-screen w-screen bg-gray-900 flex flex-col overflow-hidden">
            <div className="w-full max-w-4xl mx-auto px-4 flex flex-col h-full py-4">
                {/* Decorative Background Elements */}
                {decorativeElements.map((element, index) => (
                    <div
                        key={index}
                        className={`fixed ${element.position} transform opacity-10 hover:opacity-20 transition-opacity duration-300`}
                        style={{ transform: `rotate(${element.rotation})` }}
                    >
                        <element.icon size={element.size} className="text-violet-400" />
                    </div>
                ))}

                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-violet-300 mb-2">Coding Assistant</h1>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="bg-violet-900/30 rounded-lg px-4 py-2 flex items-center">
                            <Brain className="w-5 h-5 text-violet-400 mr-2" />
                            <span className="text-violet-300">Your AI Companion</span>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-violet-900/30 rounded-xl shadow-lg backdrop-blur-sm border border-violet-500/20 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-3 border-b border-violet-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-violet-400" />
                            <span className="text-violet-300 font-semibold">Chat Session</span>
                        </div>
                        <button
                            onClick={clearChat}
                            className="px-4 py-2 text-sm text-violet-300 border border-violet-500/50 rounded-lg 
                            hover:bg-violet-500/20 transition-colors"
                        >
                            Clear Chat
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[70%] p-4 rounded-2xl mb-4 backdrop-blur-sm
                                ${message.isUser
                                    ? 'ml-auto bg-violet-600/40 text-violet-100 rounded-br-sm border border-violet-500/30'
                                    : 'mr-auto bg-gray-800/40 text-gray-100 rounded-bl-sm border border-gray-700/30'
                                }`}
                            >
                                {message.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="max-w-[70%] p-4 rounded-2xl mb-4 bg-gray-800/40 text-gray-100 rounded-bl-sm border border-gray-700/30">
                                <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-violet-500/20">
                        <div className="flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className="flex-1 p-3 bg-gray-800/40 text-violet-100 border border-violet-500/30 rounded-lg 
                                focus:border-violet-400 focus:outline-none transition-colors placeholder-violet-400/50"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                className="px-6 py-3 bg-violet-600/40 text-violet-100 font-semibold rounded-lg
                                border border-violet-500/30 hover:bg-violet-500/40 transition-colors 
                                disabled:bg-gray-800/40 disabled:border-gray-700/30 disabled:text-gray-500 
                                disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;