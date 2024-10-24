import React, { useState, useEffect } from 'react';

interface JobData {
  title: string;
  description: string;
  client: string;
  location: string;
  skills: string;
  experience: string;
  education: string;
  status: string;
  department: string;
  industry: string;
  category: string;
  workType: string;
  startDate: string;
  endDate: string;
  rate: string;
  jobType: string;
}

interface JobPostingFormProps {
  initialJobData: JobData;
  onSubmit: (jobData: JobData) => void;
  onCancel: () => void;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({ initialJobData, onSubmit, onCancel }) => {
  const [jobData, setJobData] = useState<JobData>(initialJobData);

  useEffect(() => {
    setJobData(initialJobData);
  }, [initialJobData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          id="description"
          name="description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client/Company</label>
          <input
            type="text"
            id="client"
            name="client"
            value={jobData.client}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={jobData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            id="education"
            name="education"
            value={jobData.education}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="workType" className="block text-sm font-medium text-gray-700">Work Type</label>
          <select
            id="workType"
            name="workType"
            value={jobData.workType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate/Salary</label>
        <input
          type="text"
          id="rate"
          name="rate"
          value={jobData.rate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Job
        </button>
      </div>
    </form>
  );
};

export default JobPostingForm;