import React from 'react';

interface Job {
  id: string;
  title: string;
  client: string;
  location: string;
  description: string;
  skills: string;
  experience: string;
  workType: string;
  jobType: string;
}

interface JobListingProps {
  job: Job;
}

const JobListing: React.FC<JobListingProps> = ({ job }) => {
  return (
    <div className="p-4 border-b hover:bg-gray-50">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.client} - {job.location}</p>
      <p className="mt-2">{job.description.substring(0, 100)}...</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {job.skills.split(',').map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {skill.trim()}
          </span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <span>{job.experience} experience</span> • <span>{job.workType}</span> • <span>{job.jobType}</span>
      </div>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Apply Now
      </button>
    </div>
  );
};

export default JobListing;