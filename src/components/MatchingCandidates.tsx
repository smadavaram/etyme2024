import React, { useState, useEffect } from 'react';
import TalentCard from './TalentCard';

// ... (keep existing interfaces)

const MatchingCandidates: React.FC<MatchingCandidatesProps> = ({ job }) => {
  // ... (keep existing state and hooks)

  useEffect(() => {
    // Generate 50 fake matching candidates
    const generateFakeMatchingCandidates = () => {
      const fakeMatchingCandidates: Candidate[] = Array.from({ length: 50 }, (_, i) => ({
        id: `matching-candidate-${i + 1}`,
        name: `Matching Candidate Name ${i + 1}`,
        title: `Professional Title ${i + 1}`,
        location: `City ${i + 1}, State`,
        skills: [...job.skills, 'Additional Skill'],
        experience: `${Math.floor(Math.random() * 10) + 1} years`,
        workAuthorizationStatus: ['needSponsorship', 'openToTransfer', 'authorized', 'contractOnly'][Math.floor(Math.random() * 4)] as 'needSponsorship' | 'openToTransfer' | 'authorized' | 'contractOnly',
        languages: job.languages,
        timeZone: job.timeZone,
        rating: Math.floor(Math.random() * 5) + 1,
        matchPercentage: Math.floor(Math.random() * 30) + 70, // 70-100% match
      }));

      setCandidates(fakeMatchingCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage));
    };

    generateFakeMatchingCandidates();
  }, [job]);

  // ... (keep existing render logic)
};

export default MatchingCandidates;