import React, { useState } from 'react';

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
  description: string;
  postedDate: string;
}

interface TalentCardProps {
  talent: Talent;
  onContact: (talentId: string) => void;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent, onContact }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{talent.name}</h3>
      <p className="text-sm text-gray-600">{talent.title}</p>
      <p className="text-sm text-gray-600">{talent.location} • {talent.experience} experience</p>
      <p className="mt-2">
        {expanded ? talent.description : `${talent.description.substring(0, 150)}...`}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 hover:text-blue-700 ml-2"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {talent.skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Posted: {formatDate(talent.postedDate)}</p>
        <p>Work Authorization: {talent.workAuthorizationStatus}</p>
        <p>Languages: {talent.languages.join(', ')}</p>
        <p>Time Zone: {talent.timeZone}</p>
        <p>Rating: {talent.rating.toFixed(1)} / 5.0</p>
        {talent.needsAuthorization && <p className="text-yellow-600">Needs Authorization/Visa</p>}
      </div>
      <button
        onClick={() => onContact(talent.id)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Contact
      </button>
    </div>
  );
};

export default TalentCard;