import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import toast from 'react-hot-toast';
import { formatUnits } from 'ethers';

const OrderBookTable = () => {
  const { contract, account } = useWeb3();
  const [executingId, setExecutingId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    if (!contract) return;
    setIsLoading(true);
    try {
      const count = Number(await contract.orderCounter());
      const activeOrders = [];
      
      for (let i = 0; i < count; i++) {
        try {
          const order = await contract.orders(i);
          console.log('Raw Order', i, order);
          
          if (order[1] === true) {
            const formattedAmountIn = Number(formatUnits(order[5].toString(), 18)).toFixed(4);
            const formattedAmountOut = Number(formatUnits(order[6].toString(), 18)).toFixed(4);
            const formattedDeadline = new Date(Number(order[2]) * 1000).toLocaleString();
            
            const makerStr = order[0] ? `${order[0].slice(0, 5)}...${order[0].slice(-4)}` : 'Unknown';

            activeOrders.push({ 
              id: i, 
              maker: makerStr, 
              amountIn: formattedAmountIn, 
              amountOut: formattedAmountOut, 
              deadline: formattedDeadline 
            });
          }
        } catch (error) {
          console.error('Failed parsing order', i, error);
        }
      }
      setOrders(activeOrders);
    } catch(e) {
      console.error("Fetch orders err:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [contract]);

  const handleExecute = async (id) => {
    if (!account || !contract) return toast.error("Please connect wallet first");
    
    setExecutingId(id);
    const toastId = toast.loading("Executing Match...");
    
    try {
      const tx = await contract.executeIntent(id);
      toast.loading("Mining...", { id: toastId });
      await tx.wait();
      toast.success("Trade Executed!", { id: toastId });
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Execution failed", { id: toastId });
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between bg-gray-900 shrink-0">
        <h3 className="text-sm uppercase tracking-wider font-bold text-gray-400">Order Book Depth</h3>
        <div className="flex gap-2 text-xs font-mono text-gray-500">
          <button className="px-3 py-1 rounded bg-gray-800 text-gray-200 shadow-sm border border-gray-700">All Pairs</button>
          <button className="px-3 py-1 rounded hover:text-gray-300 transition-colors">USDC/WETH</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-950 font-semibold sticky top-0 z-10">
              <th className="px-5 py-3 font-medium">Institution</th>
              <th className="px-5 py-3 font-medium">They Pay</th>
              <th className="px-5 py-3 font-medium">You Receive</th>
              <th className="px-5 py-3 font-medium">Expires</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {isLoading ? <tr><td colSpan="5" className="text-center py-4 text-gray-500 font-mono text-sm">Loading on-chain orders...</td></tr> : orders.length === 0 ? <tr><td colSpan="5" className="text-center py-4 text-gray-500 font-mono text-sm">No active orders</td></tr> : orders.map((order, i) => (
              <tr 
                key={order.id} 
                className={`hover:bg-gray-800/60 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-gray-950/30'}`}
              >
                <td className="px-5 py-2 font-mono text-xs text-gray-400">{order.maker}</td>
                <td className="px-5 py-2 font-mono text-xs text-gray-300">{order.amountIn} TKN</td>
                <td className="px-5 py-2 font-mono text-xs font-semibold text-green-400">{order.amountOut} TKN</td>
                <td className="px-5 py-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-gray-500">
                    Exp: {order.deadline}
                  </span>
                </td>
                <td className="px-5 py-2 text-right">
                  <button 
                    onClick={() => handleExecute(order.id)}
                    disabled={executingId === order.id}
                    className="px-3 py-1 bg-[#E84142] hover:bg-red-500 disabled:bg-gray-700 text-white text-xs font-bold rounded shadow-sm transition-all uppercase tracking-wide"
                  >
                    {executingId === order.id ? 'Mining...' : 'Execute'}
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

export default OrderBookTable;
