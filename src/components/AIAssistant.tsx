import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface AIAssistantProps {
  onPostJob: (prompt: string, attachment: File | null) => void;
  onPostTalent: (prompt: string, attachment: File | null) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onPostJob, onPostTalent }) => {
  const [prompt, setPrompt] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [mode, setMode] = useState<'job' | 'talent' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && mode) {
      if (mode === 'job') {
        onPostJob(prompt, attachment);
      } else if (mode === 'talent') {
        onPostTalent(prompt, attachment);
      }
      setPrompt('');
      setAttachment(null);
      setMode(null);
      setIsExpanded(false);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleModeSelect = (selectedMode: 'job' | 'talent') => {
    setMode(selectedMode);
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setMode(null);
    setPrompt('');
    setAttachment(null);
  };

  return (
    <div className={`fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'h-80' : 'h-12'} z-50`}>
      {!isExpanded ? (
        <div className="flex items-center justify-between p-2 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <button
            onClick={() => handleModeSelect('job')}
            className="text-white hover:text-gray-200 font-medium text-sm"
          >
            Post Job
          </button>
          <span className="text-white">|</span>
          <button
            onClick={() => handleModeSelect('talent')}
            className="text-white hover:text-gray-200 font-medium text-sm"
          >
            Post Talent
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-2 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <h3 className="text-sm font-semibold">
              {mode === 'job' ? 'Post a Job' : 'Post a Talent'}
            </h3>
            <button onClick={handleClose} className="text-white hover:text-gray-200">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col flex-grow p-2">
            <div className="flex-grow relative">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === 'job'
                    ? "Describe the job position..."
                    : "Describe the candidate's qualifications..."
                }
                className="w-full h-full resize-none bg-gray-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              />
              <label htmlFor="file-upload" className="absolute bottom-2 right-2 cursor-pointer">
                <Paperclip size={16} className="text-gray-400 hover:text-gray-600" />
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleAttachment}
              />
            </div>
            {attachment && (
              <div className="text-xs text-gray-600 mt-1">
                Attached: {attachment.name}
              </div>
            )}
            <button
              type="submit"
              className={`mt-2 p-2 rounded-lg flex items-center justify-center ${
                prompt.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } text-sm`}
              disabled={!prompt.trim()}
            >
              <Send size={16} className="mr-2" />
              {mode === 'job' ? 'Post Job' : 'Post Talent'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;