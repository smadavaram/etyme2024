import React from 'react';
import TrendingActivityLog from './TrendingActivityLog';

interface ChatListProps {
  onPostJob: (prompt: string, attachment: File | null) => void;
  onPostTalent: (prompt: string, attachment: File | null) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onPostJob, onPostTalent }) => {
  return (
    <div className="w-[45%] bg-white border-l flex flex-col">
      <TrendingActivityLog />
    </div>
  );
};

export default ChatList;