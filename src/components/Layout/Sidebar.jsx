import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'book', label: 'Dashboard (Order Book)', icon: '☰' },
    { id: 'create', label: 'Create Intent', icon: '✦' },
    { id: 'admin', label: 'Compliance Admin', icon: '⚿' },
  ];

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col h-full shrink-0">
      <div className="h-14 flex items-center px-5 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Nocturne<span className="text-[#E84142]">X</span>
        </h1>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1 block">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
              activeView === item.id 
                ? 'bg-gray-800 text-white shadow-sm' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            <span className="text-base text-gray-500 w-5 text-center">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-600 font-mono text-center">
          Terminal v1.0.0-beta
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
