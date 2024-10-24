import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

// ... (keep existing interfaces)

const MatchingJobs: React.FC<MatchingJobsProps> = ({ talent }) => {
  // ... (keep existing state and hooks)

  useEffect(() => {
    // Generate 50 fake matching jobs
    const generateFakeMatchingJobs = () => {
      const fakeMatchingJobs: Job[] = Array.from({ length: 50 }, (_, i) => ({
        id: `matching-job-${i + 1}`,
        title: `Matching Job Title ${i + 1}`,
        company: `Company ${i + 1}`,
        location: `City ${i + 1}, State`,
        description: `This is a job description for Matching Job ${i + 1}. It includes details about the role and responsibilities.`,
        skills: [...talent.skills, 'Additional Skill'],
        postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        employmentType: ['Full-time', 'Part-time', 'Contract'][Math.floor(Math.random() * 3)],
        employerType: ['Direct Hire', 'Staffing Agency'][Math.floor(Math.random() * 2)],
        workSetting: ['Remote', 'On-site', 'Hybrid'][Math.floor(Math.random() * 3)],
        visaSponsorship: ['yes', 'no', 'maybe'][Math.floor(Math.random() * 3)] as 'yes' | 'no' | 'maybe',
        languages: talent.languages,
        timeZone: talent.timeZone,
        rating: Math.floor(Math.random() * 5) + 1,
        matchPercentage: Math.floor(Math.random() * 30) + 70, // 70-100% match
      }));

      setJobs(fakeMatchingJobs.sort((a, b) => b.matchPercentage - a.matchPercentage));
    };

    generateFakeMatchingJobs();
  }, [talent]);

  // ... (keep existing render logic)
};

export default MatchingJobs;