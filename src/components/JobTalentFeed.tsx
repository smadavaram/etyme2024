import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import JobCard from './JobCard';
import TalentCard from './TalentCard';

interface FeedItem {
  id: string;
  type: 'job' | 'talent';
  title: string;
  company?: string;
  name?: string;
  location: string;
  description: string;
  skills: string[];
  postedDate: string;
  employmentType?: string;
  employerType?: string;
  workSetting?: string;
  visaSponsorship: 'yes' | 'no' | 'maybe';
  languages: string[];
  timeZone: string;
  rating: number;
  needsAuthorization: boolean;
  experience?: string;
  workAuthorizationStatus?: 'needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly';
}

const JobTalentFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [visibleItems, setVisibleItems] = useState(20);
  const filterRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    employmentType: [] as string[],
    employerType: [] as string[],
    workSettings: [] as string[],
    visaSponsorship: [] as ('yes' | 'no' | 'maybe')[],
    languages: [] as string[],
    timeZone: '',
    postedDate: '',
    workAuthorizationStatus: [] as ('needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly')[],
  });

  useEffect(() => {
    const generateFakeData = () => {
      const fakeItems: FeedItem[] = [];
      for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          fakeItems.push({
            id: `job-${i}`,
            type: 'job',
            title: `Job Title ${i}`,
            company: `Company ${i}`,
            location: `City ${i}, State`,
            description: `This is a job description for Job ${i}. It includes details about the role and responsibilities.`,
            skills: ['Skill A', 'Skill B', 'Skill C'],
            postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            employmentType: ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)],
            employerType: ['Direct Hire', 'Recruiter'][Math.floor(Math.random() * 2)],
            workSetting: ['Remote', 'On-site', 'Hybrid'][Math.floor(Math.random() * 3)],
            visaSponsorship: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as 'yes' | 'no' | 'maybe',
            languages: ['English', 'Spanish', 'French'].slice(0, Math.floor(Math.random() * 3) + 1),
            timeZone: `GMT${Math.floor(Math.random() * 12) - 6}`,
            rating: Math.floor(Math.random() * 5) + 1,
            needsAuthorization: Math.random() > 0.5,
          });
        } else {
          fakeItems.push({
            id: `talent-${i}`,
            type: 'talent',
            name: `Talent Name ${i}`,
            title: `Professional Title ${i}`,
            location: `City ${i}, State`,
            description: `This is a description for Talent ${i}. It includes details about their skills and experience.`,
            skills: ['Skill X', 'Skill Y', 'Skill Z'],
            experience: `${Math.floor(Math.random() * 10) + 1} years`,
            postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            workAuthorizationStatus: ['needSponsorship', 'openToTransfer', 'authorized', 'contractOnly'][Math.floor(Math.random() * 4)] as 'needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly',
            visaSponsorship: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as 'yes' | 'no' | 'maybe',
            languages: ['English', 'Spanish', 'French'].slice(0, Math.floor(Math.random() * 3) + 1),
            timeZone: `GMT${Math.floor(Math.random() * 12) - 6}`,
            rating: Math.floor(Math.random() * 5) + 1,
            needsAuthorization: Math.random() > 0.5,
          });
        }
      }
      setFeedItems(fakeItems);
    };

    generateFakeData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'in', locationTerm);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (filterName: string, value: string | boolean | string[]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredFeed = feedItems.filter(item => {
    const searchFields = [item.title, item.location, ...item.skills, item.type === 'job' ? item.company : item.name];
    const matchesSearch = searchFields.some(field =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesLocation = item.location.toLowerCase().includes(locationTerm.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const loadMore = () => {
    setVisibleItems(prevItems => Math.min(prevItems + 20, filteredFeed.length));
  };

  return (
    <div className="w-full bg-white flex flex-col h-screen">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="flex-grow flex items-center border rounded-lg overflow-hidden">
            <div className="flex-grow flex items-center px-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search jobs, skills, companies"
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
        <div className="p-4 border-b" ref={filterRef}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employment Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => handleFilterChange('employmentType', Array.from(e.target.selectedOptions, option => option.value))}
                multiple
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Third Party">Third Party</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Visa Sponsorship</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                onChange={(e) => handleFilterChange('visaSponsorship', Array.from(e.target.selectedOptions, option => option.value))}
                multiple
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          {filteredFeed.slice(0, visibleItems).map((item) => (
            item.type === 'job' ? (
              <JobCard key={`job-${item.id}`} job={item} onApply={() => {}} />
            ) : (
              <TalentCard key={`talent-${item.id}`} talent={item} onContact={() => {}} />
            )
          ))}
          {visibleItems < filteredFeed.length && (
            <button
              onClick={loadMore}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-4"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobTalentFeed;