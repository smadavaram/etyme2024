import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import JobTalentFeed from './components/JobTalentFeed';
import WorkArea from './components/WorkArea';
import AIAssistant from './components/AIAssistant';
import TrendingActivityLog from './components/TrendingActivityLog';
import MyJobs from './components/MyJobs';
import MyTalent from './components/MyTalent';
import MatchingCandidates from './components/MatchingCandidates';
import MatchingJobs from './components/MatchingJobs';

function App() {
  const [activeSection, setActiveSection] = useState('market');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePostJob = (prompt: string, attachment: File | null) => {
    console.log('Posting job:', { prompt, attachment });
    setActiveSection('jobs');
  };

  const handlePostTalent = (prompt: string, attachment: File | null) => {
    console.log('Posting talent:', { prompt, attachment });
    setActiveSection('talent');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'market':
        return <JobTalentFeed />;
      case 'jobs':
        return <MyJobs onJobSelect={setSelectedJob} />;
      case 'talent':
        return <MyTalent onTalentSelect={setSelectedTalent} />;
      case 'activity':
        return isMobile ? <TrendingActivityLog /> : null;
      default:
        return <JobTalentFeed />;
    }
  };

  const renderSideContent = () => {
    if (activeSection === 'jobs' && selectedJob) {
      return <MatchingCandidates job={selectedJob} />;
    } else if (activeSection === 'talent' && selectedTalent) {
      return <MatchingJobs talent={selectedTalent} />;
    } else if (!isMobile) {
      return <WorkArea />;
    }
    return null;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {!isMobile && (
        <div className="w-[10%] overflow-y-auto">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            isOpen={true}
            onClose={() => {}}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          {isMobile && (
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={toggleSidebar}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">etyme</h1>
        </header>
        <main className="flex-1 flex overflow-hidden">
          {isMobile ? (
            <div className="w-full overflow-y-auto">
              {renderContent()}
            </div>
          ) : (
            <>
              <div className="w-[50%] overflow-y-auto">
                {renderContent()}
              </div>
              <div className="w-[40%] overflow-y-auto bg-gray-50">
                {renderSideContent()}
              </div>
            </>
          )}
        </main>
      </div>
      {isMobile && (
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      <AIAssistant
        onPostJob={handlePostJob}
        onPostTalent={handlePostTalent}
      />
    </div>
  );
}

export default App;