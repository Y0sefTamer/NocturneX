import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import toast from 'react-hot-toast';

const mockInstitutions = [
  { id: '1', name: 'Wintermute Trading', address: '0x1A2B...3C4D', status: 'Active', addedOn: '2026-01-15' },
  { id: '2', name: 'Jump Crypto', address: '0x5E6F...7A8B', status: 'Active', addedOn: '2026-02-02' },
  { id: '3', name: 'GSR Markets', address: '0x9C0D...1E2F', status: 'Suspended', addedOn: '2026-02-28' },
];

const ComplianceAdmin = () => {
  const { contract, account } = useWeb3();
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  const checkWhitelist = async () => {
    if (contract && account) {
      try {
        const status = await contract.isWhitelisted(account);
        setIsWhitelisted(status);
      } catch (err) {
        console.error("Error fetching whitelist status:", err);
      }
    }
  };

  useEffect(() => {
    checkWhitelist();
  }, [contract, account]);

  const handleWhitelist = async () => {
    if (!account || !contract) return toast.error("Connect wallet as admin");
    if (!addressInput) return toast.error("Enter an address");

    setLoading(true);
    const toastId = toast.loading("Submitting verification...");
    
    try {
      const tx = await contract.batchVerifyInstitutions([addressInput]);
      toast.loading("Mining...", { id: toastId });
      await tx.wait();
      toast.success("Institution Whitelisted!", { id: toastId });
      setAddressInput('');
      checkWhitelist();
    } catch (err) {
      console.error(err);
      toast.error("Whitelist failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Admin Status */}
      <div className="px-5 py-3 border-b border-gray-800 bg-blue-900/20 text-sm font-medium text-blue-200 flex justify-between">
        <span>Your Address: {account || 'Not connected'}</span>
        <span>Status: {isWhitelisted ? <span className="text-green-400">Verified</span> : <span className="text-gray-400">Not Verified</span>}</span>
      </div>

      {/* Whitelist Form */}
      <div className="p-5 border-b border-gray-800 bg-gray-900/50 shrink-0">
        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4">Add Institution</h3>
        <div className="flex gap-3 items-end max-w-2xl">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase">Institution Wallet Address</label>
            <input 
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              type="text" 
              placeholder="0x..." 
              className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 font-mono"
            />
          </div>
          <button 
            onClick={handleWhitelist}
            disabled={loading}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 text-white text-sm font-semibold rounded border border-gray-700 transition-colors whitespace-nowrap shadow-sm"
          >
            {loading ? 'Mining...' : 'Whitelist Institution'}
          </button>
        </div>
      </div>

      {/* Institutions Table */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="px-5 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-900 shrink-0">
          <h3 className="text-sm uppercase tracking-wider font-bold text-gray-400">Verified Institutions</h3>
          <span className="text-xs font-mono text-gray-500">Total: {mockInstitutions.length}</span>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-950 font-semibold sticky top-0 z-10">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Wallet Address</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Added On</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {mockInstitutions.map((inst, i) => (
              <tr 
                key={inst.id} 
                className={`hover:bg-gray-800/40 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-gray-950/30'}`}
              >
                <td className="px-5 py-2.5 text-sm font-medium text-gray-200">{inst.name}</td>
                <td className="px-5 py-2.5 font-mono text-xs text-blue-400">{inst.address}</td>
                <td className="px-5 py-2.5 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${inst.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-xs text-gray-400">{inst.status}</span>
                </td>
                <td className="px-5 py-2.5 font-mono text-xs text-gray-500">{inst.addedOn}</td>
                <td className="px-5 py-2.5 text-right">
                  <button className="text-xs text-gray-500 hover:text-white transition-colors underline decoration-gray-700 underline-offset-2">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceAdmin;
