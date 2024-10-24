import React, { useState } from 'react';

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

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
      <p className="text-sm text-gray-600">{job.employmentType} • {job.workSetting} • {job.employerType}</p>
      <p className="mt-2">
        {expanded ? job.description : `${job.description.substring(0, 150)}...`}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-blue-700 ml-2"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {job.skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Posted: {formatDate(job.postedDate)}</p>
        <p>Visa Sponsorship: {job.visaSponsorship}</p>
        <p>Languages: {job.languages.join(', ')}</p>
        <p>Time Zone: {job.timeZone}</p>
        <p>Rating: {job.rating.toFixed(1)} / 5.0</p>
        {job.needsAuthorization && <p className="text-yellow-600">Needs Authorization/Visa</p>}
      </div>
      <button
        onClick={() => onApply(job.id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Apply
      </button>
    </div>
  );
};

export default JobCard;