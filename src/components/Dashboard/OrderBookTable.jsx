import React from 'react';

const mockOrders = [
  { id: '1', maker: '0x3F2...9A1B', pay: '1,000,000 USDC', receive: '285 WETH', expires: '12 blocks' },
  { id: '2', maker: '0x8A1...4C22', pay: '500 WETH', receive: '1,750,000 USDT', expires: '45 blocks' },
  { id: '3', maker: '0x1B4...7D99', pay: '50 WBTC', receive: '3,200,000 USDC', expires: '8 blocks' },
  { id: '4', maker: '0x9C3...2E11', pay: '2,500,000 USDT', receive: '710 WETH', expires: '89 blocks' },
  { id: '5', maker: '0x4D5...1F88', pay: '100 WETH', receive: '350,000 USDC', expires: '2 blocks', urgent: true },
];

const OrderBookTable = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Active Orders</h3>
          <p className="text-gray-400">Available liquidity matching in the dark pool.</p>
        </div>
        <div className="flex gap-2 text-sm text-gray-400 bg-gray-900 border border-gray-800 rounded-lg p-1">
          <button className="px-4 py-1.5 rounded-md bg-gray-800 text-white shadow">All Pairs</button>
          <button className="px-4 py-1.5 rounded-md hover:text-white transition-colors">USDC / WETH</button>
        </div>
      </div>

      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-gray-900/50 font-semibold">
                <th className="px-6 py-4">Maker</th>
                <th className="px-6 py-4">They Pay</th>
                <th className="px-6 py-4">You Receive</th>
                <th className="px-6 py-4">Expires In</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {mockOrders.map((order, i) => (
                <tr 
                  key={order.id} 
                  className={`hover:bg-gray-800/40 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-gray-900/20'}`}
                >
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">{order.maker}</td>
                  <td className="px-6 py-4 font-mono text-sm text-gray-200">{order.pay}</td>
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-green-400">{order.receive}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-mono font-medium ${order.urgent ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-gray-800 text-gray-400'}`}>
                      {order.expires}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded shadow-[0_0_10px_rgba(220,38,38,0.2)] transition-all">
                      Execute Match
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mockOrders.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No active orders found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBookTable;
