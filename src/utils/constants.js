export const CONTRACT_ADDRESS = "0xfa3fdEFEdA463369AAc356E0Cae78aD0169f4118"; 
export const ADMIN_WALLET = "0xde1D740C1990364F7eB6265267D5A55b40056116"; 

export const CONTRACT_ABI = [
  "function createIntent(address _tokenIn, uint256 _amountIn, address _tokenOut, uint256 _amountOut, uint64 _deadline) external returns (uint256)",
  "function executeIntent(uint256 _orderId) external",
  "function batchVerifyInstitutions(address[] calldata _institutions) external"
];
