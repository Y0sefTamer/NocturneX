import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'create', label: 'Create Intent', icon: '✦' },
    { id: 'book', label: 'Order Book', icon: '☰' },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-lg leading-none">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Nocturne<span className="text-blue-500">X</span>
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === item.id 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          Institutional Platform v1.0.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
