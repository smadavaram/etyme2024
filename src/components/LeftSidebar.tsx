import React from 'react';
import { BarChart, Briefcase, Users } from 'lucide-react';

interface LeftSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeSection, setActiveSection }) => {
  const icons = [
    { name: 'market', icon: BarChart },
    { name: 'jobs', icon: Briefcase },
    { name: 'talent', icon: Users },
  ];

  return (
    <div className="w-[10%] bg-white border-r">
      {icons.map(({ name, icon: Icon }) => (
        <button
          key={name}
          className={`w-full p-4 flex flex-col items-center justify-center ${
            activeSection === name ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveSection(name)}
        >
          <Icon size={24} />
          <span className="mt-1 text-xs capitalize">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default LeftSidebar;