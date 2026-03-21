import React from 'react';

const CreateIntentForm = () => {
  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Create New Intent</h3>
        <p className="text-gray-400">Configure parameters for your OTC trade intent. It will be submitted to the intent pool.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="space-y-6">
          
          {/* Token In */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Token In</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none">
                <option>USDC</option>
                <option>USDT</option>
                <option>WETH</option>
                <option>WBTC</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Amount In</label>
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-lg"
              />
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </div>

          {/* Token Out */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Token Out</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none">
                <option>WETH</option>
                <option>USDC</option>
                <option>USDT</option>
                <option>WBTC</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Receive Amount</label>
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-lg"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-gray-400">Deadline (Blocks)</label>
            <input 
              type="text" 
              placeholder="e.g. 50" 
              defaultValue="100"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
            />
          </div>

          <div className="pt-4">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all flex justify-center items-center gap-2">
              Sign & Submit Intent
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateIntentForm;
