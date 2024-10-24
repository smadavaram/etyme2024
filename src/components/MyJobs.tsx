import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { Search, MapPin, Filter } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  postedDate: string;
  employmentType: string;
  employerType: string;
  workSetting: string;
  visaSponsorship: 'yes' | 'no' | 'maybe';
  languages: string[];
  timeZone: string;
  rating: number;
  needsAuthorization: boolean;
}

interface MyJobsProps {
  onJobSelect: (job: Job) => void;
}

const MyJobs: React.FC<MyJobsProps> = ({ onJobSelect }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Generate 50 fake jobs
    const generateFakeJobs = () => {
      const fakeJobs: Job[] = Array.from({ length: 50 }, (_, i) => ({
        id: `my-job-${i + 1}`,
        title: `My Job Title ${i + 1}`,
        company: `My Company ${i + 1}`,
        location: `City ${i + 1}, State`,
        description: `This is a job description for My Job ${i + 1}. It includes details about the role and responsibilities.`,
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
      }));

      setJobs(fakeJobs);
    };

    generateFakeJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const filteredJobs = jobs.filter(job => {
    const searchFields = [job.title, job.company, job.location, ...job.skills];
    const matchesSearch = searchFields.some(field =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
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
        <div className="p-4 border-b">
          {/* Add filter options here */}
        </div>
      )}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          {filteredJobs.map((job) => (
            <div key={job.id} onClick={() => onJobSelect(job)}>
              <JobCard job={job} onApply={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;