export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const ADMIN_WALLET = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // Hardhat default #0

export const CONTRACT_ABI = [
  "function createIntent(address _tokenIn, uint256 _amountIn, address _tokenOut, uint256 _amountOut, uint64 _deadline) external returns (uint256)",
  "function executeIntent(uint256 _orderId) external",
  "function batchVerifyInstitutions(address[] calldata _institutions) external"
];
