import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
              <span className="text-white font-bold text-lg leading-none">O</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              OTC DarkPool
            </h1>
          </div>
          <nav>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
              Connect Wallet
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Abstract background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
            <span className="flex w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Platform Initialized
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2">
            Institutional Grade <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">
              Private Trading
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Execute large block trades securely and anonymously with our decentralized OTC dark pool. Zero market impact. Maximum confidentiality.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5">
              Launch Exchange
            </button>
            <button className="px-8 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold transition-all border border-slate-700 hover:border-slate-600 backdrop-blur-sm">
              View Documentation
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
