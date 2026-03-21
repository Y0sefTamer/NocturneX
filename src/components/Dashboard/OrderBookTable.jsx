import React from 'react';

const mockOrders = [
  { id: '1', maker: '0x3F2...9A1B', pay: '1,000,000 USDC', receive: '285 WETH', expires: '12 blks' },
  { id: '2', maker: '0x8A1...4C22', pay: '500 WETH', receive: '1,750,000 USDT', expires: '45 blks' },
  { id: '3', maker: '0x1B4...7D99', pay: '50 WBTC', receive: '3,200,000 USDC', expires: '8 blks' },
  { id: '4', maker: '0x9C3...2E11', pay: '2,500,000 USDT', receive: '710 WETH', expires: '89 blks' },
  { id: '5', maker: '0x4D5...1F88', pay: '100 WETH', receive: '350,000 USDC', expires: '2 blks', urgent: true },
  { id: '6', maker: '0x7E9...3B44', pay: '15,000,000 USDC', receive: '4,200 WETH', expires: '120 blks' },
  { id: '7', maker: '0x2A6...8D55', pay: '10 WBTC', receive: '640,000 USDT', expires: '18 blks' },
  { id: '8', maker: '0x5C1...9E33', pay: '2,000 WETH', receive: '7,100,000 USDC', expires: '55 blks' },
];

const OrderBookTable = () => {
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
            {mockOrders.map((order, i) => (
              <tr 
                key={order.id} 
                className={`hover:bg-gray-800/60 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-gray-950/30'}`}
              >
                <td className="px-5 py-2 font-mono text-xs text-gray-400">{order.maker}</td>
                <td className="px-5 py-2 font-mono text-xs text-gray-300">{order.pay}</td>
                <td className="px-5 py-2 font-mono text-xs font-semibold text-green-400">{order.receive}</td>
                <td className="px-5 py-2">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${order.urgent ? 'bg-[#E84142]/10 text-[#E84142] border border-[#E84142]/30' : 'text-gray-500'}`}>
                    {order.expires}
                  </span>
                </td>
                <td className="px-5 py-2 text-right">
                  <button className="px-3 py-1 bg-[#E84142] hover:bg-red-500 text-white text-xs font-bold rounded shadow-sm transition-all uppercase tracking-wide">
                    Execute
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
