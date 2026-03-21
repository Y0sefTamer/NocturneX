// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract InstitutionalOTC is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    // 1. Custom Errors (Gas Optimization & DX)
    error InvalidToken();
    error ZeroAmount();
    error IdenticalTokens();
    error OrderNotActiveOrExpired();
    error UnauthorizedMaker();
    error MakerCannotExecute();
    error NotWhitelisted(address account);

    // 2. Packed Struct for Gas Optimization (Variables ordered by size)
    struct IntentOrder {
        address maker; // 20 bytes
        bool isActive; // 1 byte
        uint64 deadline; // 8 bytes (Fits in 1 word/slot with maker and isActive)
        address tokenIn; // 20 bytes
        address tokenOut; // 20 bytes
        uint256 amountIn; // 32 bytes
        uint256 amountOut; // 32 bytes
    }

    mapping(uint256 => IntentOrder) public orders;
    uint256 public orderCounter;

    mapping(address => bool) public isWhitelisted;

    event IntentCreated(
        uint256 indexed orderId,
        address indexed maker,
        address tokenIn,
        uint256 amountIn,
        address tokenOut,
        uint256 amountOut,
        uint64 deadline
    );
    event IntentExecuted(uint256 indexed orderId, address indexed taker);
    event IntentCancelled(uint256 indexed orderId);
    event InstitutionVerified(address indexed institution);

    constructor() Ownable(msg.sender) {}

    modifier onlyWhitelisted() {
        _onlyWhitelisted();
        _;
    }

    function _onlyWhitelisted() internal view {
        if (!isWhitelisted[msg.sender]) revert NotWhitelisted(msg.sender);
    }

    // FEATURE FOR DEMO: Batch whitelist to save time during presentation
    function batchVerifyInstitutions(address[] calldata _institutions) external onlyOwner {
        for (uint256 i = 0; i < _institutions.length; ++i) {
            isWhitelisted[_institutions[i]] = true;
            emit InstitutionVerified(_institutions[i]);
        }
    }

    // Create a new intent order with a deadline
    function createIntent(address _tokenIn, uint256 _amountIn, address _tokenOut, uint256 _amountOut, uint64 _deadline)
        external
        nonReentrant
        onlyWhitelisted
    {
        if (_tokenIn == address(0) || _tokenOut == address(0)) revert InvalidToken();
        if (_amountIn == 0 || _amountOut == 0) revert ZeroAmount();
        if (_tokenIn == _tokenOut) revert IdenticalTokens();
        if (_deadline <= block.timestamp) revert OrderNotActiveOrExpired();

        IERC20(_tokenIn).safeTransferFrom(msg.sender, address(this), _amountIn);

        uint256 currentOrderId = orderCounter++; // Gas optimization: post-increment

        orders[currentOrderId] = IntentOrder({
            maker: msg.sender,
            isActive: true,
            deadline: _deadline,
            tokenIn: _tokenIn,
            tokenOut: _tokenOut,
            amountIn: _amountIn,
            amountOut: _amountOut
        });

        emit IntentCreated(currentOrderId, msg.sender, _tokenIn, _amountIn, _tokenOut, _amountOut, _deadline);
    }

    // Execute an active intent (Atomic Swap)
    function executeIntent(uint256 _orderId) external nonReentrant onlyWhitelisted {
        IntentOrder storage order = orders[_orderId];

        if (!order.isActive || block.timestamp > order.deadline) revert OrderNotActiveOrExpired();
        if (order.maker == msg.sender) revert MakerCannotExecute();

        order.isActive = false; // CEI Pattern

        IERC20(order.tokenOut).safeTransferFrom(msg.sender, order.maker, order.amountOut);
        IERC20(order.tokenIn).safeTransfer(msg.sender, order.amountIn);

        emit IntentExecuted(_orderId, msg.sender);
    }

    // Cancel an active intent
    function cancelIntent(uint256 _orderId) external nonReentrant {
        IntentOrder storage order = orders[_orderId];

        if (order.maker != msg.sender) revert UnauthorizedMaker();
        if (!order.isActive) revert OrderNotActiveOrExpired();

        order.isActive = false;
        IERC20(order.tokenIn).safeTransfer(msg.sender, order.amountIn);

        emit IntentCancelled(_orderId);
    }

    // FEATURE FOR DEMO: Simulate swap to show "Zero Slippage" visually on frontend
    function simulateSwap(uint256 _orderId) external view returns (address tokenToReceive, uint256 exactAmount) {
        IntentOrder storage order = orders[_orderId];
        return (order.tokenIn, order.amountIn);
    }
}
