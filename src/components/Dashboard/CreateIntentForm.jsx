import React from 'react';

const CreateIntentForm = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-5 py-4 border-b border-gray-800 bg-gray-900 shrink-0">
        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-400">Create Trade Intent</h3>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-xl space-y-5">
          {/* Token In */}
          <div className="flex gap-4">
            <div className="w-1/3 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sell Asset</label>
              <select className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 appearance-none font-mono cursor-pointer">
                <option>USDC</option>
                <option>USDT</option>
                <option>WETH</option>
                <option>WBTC</option>
              </select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</label>
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-800 flex-1"></div>
            <div className="w-6 h-6 border border-gray-800 rounded bg-gray-950 flex items-center justify-center text-gray-500 shrink-0 shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            <div className="h-px bg-gray-800 flex-1"></div>
          </div>

          {/* Token Out */}
          <div className="flex gap-4">
            <div className="w-1/3 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Buy Asset</label>
              <select className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 appearance-none font-mono cursor-pointer">
                <option>WETH</option>
                <option>USDC</option>
                <option>USDT</option>
                <option>WBTC</option>
              </select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Receive Amount</label>
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Deadline (Blocks)</label>
            <input 
              type="text" 
              placeholder="e.g. 50" 
              defaultValue="100"
              className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 font-mono"
            />
          </div>

          <div className="pt-6">
            <button className="bg-gray-100 hover:bg-white text-gray-900 text-sm font-bold py-2.5 px-6 rounded shadow-sm transition-colors uppercase tracking-wider w-full">
              Sign & Broadcast Intent
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateIntentForm;
