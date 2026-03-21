import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="h-screen w-full flex bg-gray-950 text-gray-200 overflow-hidden font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 bg-gray-900/50 border-b border-gray-800 backdrop-blur-sm z-10">
          <h2 className="text-lg font-semibold text-white capitalize">
            {activeView === 'create' ? 'Create Intent' : 'Order Book'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              Network Connected
            </div>
            <button className="px-5 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors border border-gray-700">
              0x1A4...8B29
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
