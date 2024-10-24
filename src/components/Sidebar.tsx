import React from 'react';
import { BarChart, Briefcase, Users, Grid, LogIn, MessageCircle, BookOpen, Activity } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen, onClose }) => {
  const menuItems = [
    { icon: BarChart, label: 'Market', section: 'market' },
    { icon: Briefcase, label: 'My Jobs', section: 'jobs' },
    { icon: Users, label: 'My Talent', section: 'talent' },
    { icon: BookOpen, label: 'Upskilling', section: 'upskilling' },
    { icon: Grid, label: 'Apps', section: 'apps' },
    { icon: MessageCircle, label: 'Chat', section: 'chat' },
    { icon: Activity, label: 'Activity', section: 'activity' },
    { icon: LogIn, label: 'Sign In', section: 'signin' },
  ];

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 bg-white w-64 md:w-full shadow-lg`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-600">etyme</h1>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map(({ icon: Icon, label, section }) => (
            <button
              key={section}
              className={`w-full p-4 flex flex-col items-center justify-center ${
                activeSection === section ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleSectionChange(section)}
            >
              <Icon size={24} className="mb-1" />
              <span className="text-xs text-center">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;