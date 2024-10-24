import React, { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
}

const CandidateUpskilling: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Advanced React Patterns',
      description: 'Learn advanced React patterns and best practices.',
      duration: '4 weeks',
      level: 'Intermediate',
    },
    {
      id: '2',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to machine learning algorithms and applications.',
      duration: '6 weeks',
      level: 'Beginner',
    },
    // Add more courses...
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Upskilling Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{course.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-blue-600">{course.duration}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {course.level}
              </span>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateUpskilling;