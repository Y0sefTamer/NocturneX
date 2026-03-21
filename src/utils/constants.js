export const CONTRACT_ADDRESS = "0xfa3fdEFEdA463369AAc356E0Cae78aD0169f4118"; 
export const ADMIN_WALLET = "0xde1D740C1990364F7eB6265267D5A55b40056116"; 

export const MOCK_USDC = "0xd496Ef39564b7c2559407941C8dB77919820AA00";
export const MOCK_WETH = "0xf840a594E4c47ec66a88D9d144F8f016670b4CB4";

export const CONTRACT_ABI = [
  "function createIntent(address _tokenIn, uint256 _amountIn, address _tokenOut, uint256 _amountOut, uint64 _deadline) external returns (uint256)",
  "function executeIntent(uint256 _orderId) external",
  "function batchVerifyInstitutions(address[] calldata _institutions) external",
  "function isWhitelisted(address) external view returns (bool)",
  "function orderCounter() external view returns (uint256)",
  "function orders(uint256) view returns (address maker, bool isActive, uint64 deadline, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut)"
];

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)"
];
