import React, { useState, useEffect, useRef } from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface ActivityItem {
  id: number;
  description: string;
  timestamp: Date;
}

interface Metric {
  title: string;
  count: number;
  trend: string;
}

const TrendingActivityLog: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(20);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const activityRef = useRef<HTMLDivElement>(null);

  const metrics: Metric[] = [
    { title: 'Jobs', count: 150, trend: '+5%' },
    { title: 'Talent', count: 500, trend: '+8%' },
    { title: 'Applications', count: 320, trend: '+12%' },
  ];

  useEffect(() => {
    // Generate 100 fake activities
    const generateActivities = () => {
      const newActivities: ActivityItem[] = [];
      for (let i = 1; i <= 100; i++) {
        newActivities.push({
          id: i,
          description: `Activity ${i}: Lorem ipsum dolor sit amet`,
          timestamp: new Date(Date.now() - i * 1000000),
        });
      }
      setActivities(newActivities);
    };

    generateActivities();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (activityRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = activityRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setVisibleItems((prev) => Math.min(prev + 20, activities.length));
        }
      }
    };

    const currentRef = activityRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activities.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{metric.count}</span>
                <span className="text-green-500 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto" ref={activityRef}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
          {activities.slice(0, visibleItems).map((activity) => (
            <div key={activity.id} className="flex items-center p-2 border-b">
              <div className="flex-grow">
                <span className="text-sm text-gray-600">{activity.description}</span>
              </div>
              <div className="flex items-center text-xs text-gray-400 ml-2">
                <Clock size={12} className="mr-1" />
                {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingActivityLog;