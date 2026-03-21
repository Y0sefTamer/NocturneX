import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children, activeView, setActiveView }) => {
  return (
    <div className="h-screen w-full flex bg-gray-950 text-gray-200 overflow-hidden font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 flex items-center justify-between px-6 bg-gray-900 border-b border-gray-800 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-gray-100 uppercase tracking-wider">
              {activeView === 'book' && 'Order Book Overview'}
              {activeView === 'create' && 'Intent Creation Engine'}
              {activeView === 'admin' && 'Compliance & Access'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></span>
              SECURE
            </div>
            <button className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-white text-xs font-mono transition-colors border border-gray-700">
              0x1A4...8B29
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-950 p-6 flex flex-col gap-6">
          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-3 gap-4 shrink-0">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Volume</span>
              <span className="text-xl font-mono text-white">$125,000,000</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Active Intents</span>
              <span className="text-xl font-mono text-blue-400">24</span>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col justify-center">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Verified Institutions</span>
              <span className="text-xl font-mono text-green-400">12</span>
            </div>
          </div>
          
          <div className="flex-1 min-h-0 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex flex-col relative shadow-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
