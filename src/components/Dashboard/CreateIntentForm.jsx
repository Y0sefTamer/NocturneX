import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { parseUnits } from 'ethers';
import toast from 'react-hot-toast';

const CreateIntentForm = () => {
  const { contract, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tokenIn: 'USDC',
    amountIn: '',
    tokenOut: 'WETH',
    amountOut: '',
    deadline: '100'
  });

  const mockAddresses = {
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
  };

  const decimals = { USDC: 6, USDT: 6, WETH: 18, WBTC: 8 };

  const handleCreate = async () => {
    if (!account || !contract) return toast.error("Please connect wallet first");
    if (!formData.amountIn || !formData.amountOut) return toast.error("Please fill all amounts");

    setLoading(true);
    const toastId = toast.loading("Confirming transaction...");
    
    try {
      const parsedAmountIn = parseUnits(formData.amountIn, decimals[formData.tokenIn]);
      const parsedAmountOut = parseUnits(formData.amountOut, decimals[formData.tokenOut]);
      
      const tx = await contract.createIntent(
        mockAddresses[formData.tokenIn],
        parsedAmountIn,
        mockAddresses[formData.tokenOut],
        parsedAmountOut,
        Number(formData.deadline)
      );
      
      toast.loading("Mining...", { id: toastId });
      await tx.wait();
      toast.success("Intent Created Successfully!", { id: toastId });
      setFormData({ ...formData, amountIn: '', amountOut: '' });
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed or rejected", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

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
              <select 
                value={formData.tokenIn}
                onChange={(e) => setFormData({...formData, tokenIn: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 appearance-none font-mono cursor-pointer"
              >
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
                value={formData.amountIn}
                onChange={(e) => setFormData({...formData, amountIn: e.target.value})}
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
              <select 
                value={formData.tokenOut}
                onChange={(e) => setFormData({...formData, tokenOut: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 appearance-none font-mono cursor-pointer"
              >
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
                value={formData.amountOut}
                onChange={(e) => setFormData({...formData, amountOut: e.target.value})}
                placeholder="0.00" 
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Deadline (Blocks)</label>
            <input 
              type="text" 
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              placeholder="e.g. 50" 
              className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-600 font-mono"
            />
          </div>

          <div className="pt-6">
            <button 
              onClick={handleCreate}
              disabled={loading}
              className="bg-gray-100 disabled:bg-gray-500 hover:bg-white text-gray-900 text-sm font-bold py-2.5 px-6 rounded shadow-sm transition-colors uppercase tracking-wider w-full"
            >
              {loading ? 'Mining...' : 'Sign & Broadcast Intent'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateIntentForm;
