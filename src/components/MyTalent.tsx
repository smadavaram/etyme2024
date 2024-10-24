import React, { useState, useEffect } from 'react';
import TalentCard from './TalentCard';
import { Search, MapPin, Filter } from 'lucide-react';

interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  workAuthorizationStatus: 'needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly';
  languages: string[];
  timeZone: string;
  rating: number;
  needsAuthorization: boolean;
}

interface MyTalentProps {
  onTalentSelect: (talent: Talent) => void;
}

const MyTalent: React.FC<MyTalentProps> = ({ onTalentSelect }) => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Generate 50 fake talents
    const generateFakeTalents = () => {
      const fakeTalents: Talent[] = Array.from({ length: 50 }, (_, i) => ({
        id: `my-talent-${i + 1}`,
        name: `My Talent Name ${i + 1}`,
        title: `Professional Title ${i + 1}`,
        location: `City ${i + 1}, State`,
        skills: ['Skill X', 'Skill Y', 'Skill Z'],
        experience: `${Math.floor(Math.random() * 10) + 1} years`,
        workAuthorizationStatus: ['needSponsorship', 'openToTransfer', 'authorized', 'contractOnly'][Math.floor(Math.random() * 4)] as 'needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly',
        languages: ['English', 'Spanish', 'French'].slice(0, Math.floor(Math.random() * 3) + 1),
        timeZone: `GMT${Math.floor(Math.random() * 12) - 6}`,
        rating: Math.floor(Math.random() * 5) + 1,
        needsAuthorization: Math.random() > 0.5,
      }));

      setTalents(fakeTalents);
    };

    generateFakeTalents();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const filteredTalents = talents.filter(talent => {
    const searchFields = [talent.name, talent.title, talent.location, ...talent.skills];
    const matchesSearch = searchFields.some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesLocation = talent.location.toLowerCase().includes(locationTerm.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="w-full bg-white flex flex-col h-screen">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="flex-grow flex items-center border rounded-lg overflow-hidden">
            <div className="flex-grow flex items-center px-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search talents, skills, titles"
                className="w-full p-2 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="border-l flex items-center px-2">
              <MapPin size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 outline-none"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={toggleFilter}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Filter size={20} />
          </button>
        </form>
      </div>
      {showFilter && (
        <div className="p-4 border-b">
          {/* Add filter options here */}
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          {filteredTalents.map((talent) => (
            <div key={talent.id} onClick={() => onTalentSelect(talent)}>
              <TalentCard talent={talent} onContact={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTalent;