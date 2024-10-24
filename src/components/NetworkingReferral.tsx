import React, { useState } from 'react';

interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  mutualConnections: number;
}

const NetworkingReferral: React.FC = () => {
  const [connections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      title: 'Senior Recruiter',
      company: 'TechStaff Inc.',
      mutualConnections: 15,
    },
    {
      id: '2',
      name: 'Bob Smith',
      title: 'HR Manager',
      company: 'InnovateCorp',
      mutualConnections: 8,
    },
    // Add more connections...
  ]);

  const [referralCode, setReferralCode] = useState('');

  const handleGenerateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralCode(code);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Networking & Referrals</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Your Network</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map((connection) => (
            <div key={connection.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold">{connection.name}</h4>
              <p className="text-sm text-gray-600">{connection.title}</p>
              <p className="text-sm text-gray-600">{connection.company}</p>
              <p className="text-sm text-blue-600 mt-2">
                {connection.mutualConnections} mutual connections
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Referral Program</h3>
        <p className="mb-4">Refer a friend and earn rewards when they get hired!</p>
        <button
          onClick={handleGenerateReferralCode}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Generate Referral Code
        </button>
        {referralCode && (
          <div className="mt-4">
            <p className="font-semibold">Your Referral Code:</p>
            <p className="text-2xl font-bold text-blue-600">{referralCode}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkingReferral;