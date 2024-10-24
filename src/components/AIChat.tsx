import React, { useState } from 'react';
import { Send, Paperclip, Briefcase, Users } from 'lucide-react';

interface AIChatProps {
  onPostJob: (prompt: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onPostJob }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<'job' | 'talent' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (isPosting === 'job') {
        onPostJob(message);
      } else if (isPosting === 'talent') {
        console.log('Posting talent:', message);
        // Implement talent posting logic here
      } else {
        console.log('Regular message:', message);
        // Handle regular message
      }
      setMessage('');
      setAttachment(null);
      setIsPosting(null);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-4 flex flex-col">
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => setIsPosting('job')}
          className={`px-3 py-1 rounded ${
            isPosting === 'job'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          Post Job
        </button>
        <button
          onClick={() => setIsPosting('talent')}
          className={`px-3 py-1 rounded ${
            isPosting === 'talent'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          Post Talent
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <label htmlFor="file-upload" className="cursor-pointer mr-2">
          <Paperclip size={20} className="text-gray-500 hover:text-gray-700" />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleAttachment}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isPosting === 'job'
              ? "Enter job description..."
              : isPosting === 'talent'
              ? "Enter candidate application..."
              : "Type your message..."
          }
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={20} />
        </button>
      </form>
      {attachment && (
        <div className="mt-2 text-sm text-gray-600">
          Attached: {attachment.name}
        </div>
      )}
    </div>
  );
};

export default AIChat;