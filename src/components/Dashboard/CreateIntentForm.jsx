import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { parseUnits, Contract } from 'ethers';
import toast from 'react-hot-toast';
import { CONTRACT_ADDRESS, ERC20_ABI, MOCK_USDC, MOCK_WETH } from '../../utils/constants';

const CreateIntentForm = () => {
  const { contract, account, signer } = useWeb3();
  const [loadingText, setLoadingText] = useState('');
  const [formData, setFormData] = useState({
    tokenIn: MOCK_USDC,
    amountIn: '',
    tokenOut: MOCK_WETH,
    amountOut: '',
    deadline: '100'
  });

  const getDecimals = (address) => {
    if (!address) return 18;
    if (address.toLowerCase() === MOCK_USDC.toLowerCase()) return 6;
    if (address.toLowerCase() === "0xdac17f958d2ee523a2206206994597c13d831ec7") return 6; // USDT
    if (address.toLowerCase() === "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599") return 8; // WBTC
    return 18; // Default to 18 for WETH & others
  };

  const handleCreate = async () => {
    if (!account || !contract || !signer) return toast.error("Please connect wallet first");
    if (!formData.amountIn || !formData.amountOut) return toast.error("Please fill all amounts");
    
    setLoadingText("Checking Network...");
    const toastId = toast.loading("Checking Network...");

    try {
      if (typeof window.ethereum !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0xa869' && parseInt(chainId, 16) !== 43113) {
          setLoadingText("Switching Network...");
          toast.loading("Switching to Avalanche Fuji...", { id: toastId });
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa869' }],
          });
        }
      }

      setLoadingText("Approving Tokens...");
      toast.loading("Approving Tokens...", { id: toastId });

      const parsedAmountIn = parseUnits(formData.amountIn.toString(), 18);
      const parsedAmountOut = parseUnits(formData.amountOut.toString(), 18);
      const deadline = Math.floor(Date.now() / 1000) + (parseInt(formData.deadline) * 60);
      
      const tokenInAddress = formData.tokenIn;
      const tokenInContract = new Contract(tokenInAddress, ERC20_ABI, signer);

      const approveTx = await tokenInContract.approve(CONTRACT_ADDRESS, parsedAmountIn);
      await approveTx.wait();

      setLoadingText("Creating Intent...");
      toast.loading("Creating Intent...", { id: toastId });

      const tx = await contract.createIntent(
        tokenInAddress,
        parsedAmountIn,
        formData.tokenOut,
        parsedAmountOut,
        deadline
      );
      
      setLoadingText("Mining...");
      toast.loading("Mining...", { id: toastId });
      await tx.wait();
      toast.success("Intent Created Successfully!", { id: toastId });
      setFormData({ ...formData, amountIn: '', amountOut: '' });
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed or rejected", { id: toastId });
    } finally {
      setLoadingText("");
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sell Asset Address</label>
              <input 
                type="text" 
                value={formData.tokenIn}
                onChange={(e) => setFormData({...formData, tokenIn: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 font-mono"
              />
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Buy Asset Address</label>
              <input 
                type="text" 
                value={formData.tokenOut}
                onChange={(e) => setFormData({...formData, tokenOut: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-600 font-mono"
              />
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
              disabled={!!loadingText}
              className="bg-gray-100 disabled:bg-gray-500 hover:bg-white text-gray-900 text-sm font-bold py-2.5 px-6 rounded shadow-sm transition-colors uppercase tracking-wider w-full"
            >
              {loadingText || 'Sign & Broadcast Intent'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateIntentForm;
