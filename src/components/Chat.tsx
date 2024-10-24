import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface ChatProps {
  currentUser: string;
  recipient: string;
}

const Chat: React.FC<ChatProps> = ({ currentUser, recipient }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Simulated message fetching
    const fetchedMessages: Message[] = [
      { id: '1', sender: 'John', content: 'Hi, I have a new job opening.', timestamp: new Date() },
      { id: '2', sender: 'Sarah', content: 'Great! Can you share more details?', timestamp: new Date() },
    ];
    setMessages(fetchedMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: currentUser,
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white p-4 shadow">
        <h2 className="text-lg font-semibold">{recipient}</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === currentUser ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === currentUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="bg-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;