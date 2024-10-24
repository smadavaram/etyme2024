import React, { useState } from 'react';

const WorkArea: React.FC = () => {
  const [visibleLogs, setVisibleLogs] = useState(20);
  const metrics = [
    { title: 'Jobs', count: 150, trend: '+5%' },
    { title: 'Talent', count: 500, trend: '+8%' },
    { title: 'Applications', count: 320, trend: '+12%' },
  ];

  const activityLog = [
    { id: 1, recruiter: 'Sarah Johnson', company: 'TechCorp', action: 'posted a new job for Senior Data Scientist', time: '1 hour ago' },
    { id: 2, recruiter: 'Mike Chen', company: 'InnovateSoft', action: 'updated the Full Stack Developer job description', time: '3 hours ago' },
    { id: 3, recruiter: 'Emily Rodriguez', company: 'DesignHub', action: 'reviewed 15 new applications for UI/UX Designer role', time: '5 hours ago' },
    { id: 4, recruiter: 'Alex Lee', company: 'CloudTech', action: 'scheduled interviews for DevOps Engineer position', time: '6 hours ago' },
    { id: 5, recruiter: 'Lisa Wang', company: 'AI Solutions', action: 'posted a new job for Machine Learning Engineer', time: '8 hours ago' },
    { id: 6, recruiter: 'David Kim', company: 'FinTech Inc.', action: 'closed the Software Architect position', time: '10 hours ago' },
    { id: 7, recruiter: 'Rachel Green', company: 'E-commerce Giant', action: 'reviewed resumes for Frontend Developer role', time: '12 hours ago' },
    { id: 8, recruiter: 'Tom Harris', company: 'HealthTech', action: 'updated the job requirements for Mobile App Developer', time: '14 hours ago' },
    { id: 9, recruiter: 'Emma Watson', company: 'EdTech Startup', action: 'posted a new job for Product Manager', time: '16 hours ago' },
    { id: 10, recruiter: 'Chris Evans', company: 'Gaming Studio', action: 'scheduled a second round of interviews for Game Developer', time: '18 hours ago' },
    { id: 11, recruiter: 'Olivia Martinez', company: 'Data Analytics Co.', action: 'reviewed portfolio submissions for UX Designer role', time: '20 hours ago' },
    { id: 12, recruiter: 'Daniel Lee', company: 'Cybersecurity Firm', action: 'posted a new job for Security Analyst', time: '22 hours ago' },
    { id: 13, recruiter: 'Sophie Turner', company: 'Social Media Platform', action: 'closed applications for Senior Backend Engineer', time: '1 day ago' },
    { id: 14, recruiter: 'Ryan Reynolds', company: 'Streaming Service', action: 'updated job benefits for Software Engineering roles', time: '1 day ago' },
    { id: 15, recruiter: 'Jennifer Lawrence', company: 'IoT Solutions', action: 'posted a new job for Embedded Systems Engineer', time: '1 day ago' },
    { id: 16, recruiter: 'Robert Downey Jr.', company: 'AR/VR Startup', action: 'reviewed technical assessments for 3D Graphics Programmer', time: '1 day ago' },
    { id: 17, recruiter: 'Scarlett Johansson', company: 'Blockchain Venture', action: 'scheduled interviews for Blockchain Developer', time: '2 days ago' },
    { id: 18, recruiter: 'Chris Hemsworth', company: 'Cloud Services', action: 'posted a new job for Cloud Solutions Architect', time: '2 days ago' },
    { id: 19, recruiter: 'Natalie Portman', company: 'AI Research Lab', action: 'reviewed applications for AI Research Scientist', time: '2 days ago' },
    { id: 20, recruiter: 'Mark Ruffalo', company: 'Green Tech', action: 'updated job description for Sustainability Software Engineer', time: '2 days ago' },
    { id: 21, recruiter: 'Zoe Saldana', company: 'Space Tech', action: 'posted a new job for Aerospace Software Engineer', time: '3 days ago' },
    { id: 22, recruiter: 'Chris Pratt', company: 'Robotics Firm', action: 'scheduled interviews for Robotics Software Engineer', time: '3 days ago' },
    { id: 23, recruiter: 'Brie Larson', company: 'Quantum Computing Startup', action: 'reviewed resumes for Quantum Algorithm Developer', time: '3 days ago' },
    { id: 24, recruiter: 'Tom Holland', company: 'Wearable Tech', action: 'posted a new job for Wearable Device Programmer', time: '4 days ago' },
    { id: 25, recruiter: 'Elizabeth Olsen', company: 'Digital Health', action: 'closed applications for Health Informatics Specialist', time: '4 days ago' },
  ];

  const loadMore = () => {
    setVisibleLogs(prevVisible => Math.min(prevVisible + 20, activityLog.length));
  };

  return (
    <div className="w-full bg-gray-100 p-4 overflow-y-auto h-screen">
      <h2 className="text-lg font-semibold mb-4">Market Activity</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold mb-1 text-gray-600">{metric.title}</h3>
            <p className="text-2xl font-bold mb-1">{metric.count}</p>
            <p className="text-sm font-semibold text-green-600">{metric.trend}</p>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-3">Activity Log</h3>
      <div className="space-y-2">
        {activityLog.slice(0, visibleLogs).map((activity) => (
          <div key={activity.id} className="bg-white p-2 rounded-lg shadow-sm">
            <p className="text-xs">
              <span className="font-semibold text-blue-600">{activity.recruiter}</span>
              {' from '}
              <span className="font-semibold text-green-600">{activity.company}</span>
              {' '}{activity.action}
              <span className="text-gray-500 ml-2">
                {activity.time}
              </span>
            </p>
          </div>
        ))}
      </div>
      {visibleLogs < activityLog.length && (
        <button
          onClick={loadMore}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default WorkArea;