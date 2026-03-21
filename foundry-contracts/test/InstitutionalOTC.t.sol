// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {InstitutionalOTC} from "../src/InstitutionalOTC.sol";
import {MockERC20} from "../src/MockERC20.sol";

contract InstitutionalOTCTest is Test {
    InstitutionalOTC public otc;
    MockERC20 public usdc;
    MockERC20 public weth;

    // Mock institutions (Maker and Taker)
    address public maker = address(0x1);
    address public taker = address(0x2);
    address public hacker = address(0x3); // Unverified user

    function setUp() public {
        // 1. Deploy the main contract and mock tokens
        otc = new InstitutionalOTC();
        usdc = new MockERC20("USD Coin", "USDC");
        weth = new MockERC20("Wrapped Ether", "WETH");  

        // 2. Batch whitelist our legitimate institutions
        address[] memory institutions = new address[](2);
        institutions[0] = maker;
        institutions[1] = taker;
        otc.batchVerifyInstitutions(institutions);

        // 3. Fund the institutions
        usdc.mint(maker, 100_000 * 10**18); // Maker has 100k USDC
        weth.mint(taker, 50 * 10**18);      // Taker has 50 WETH
    }

    function test_CreateAndExecuteIntent() public {
        uint256 amountIn = 100_000 * 10**18; // 100k USDC
        uint256 amountOut = 50 * 10**18;     // 50 WETH
        uint64 deadline = uint64(block.timestamp + 1 hours);

        // ==========================================
        // STEP 1: Maker creates the intent
        // ==========================================
        vm.startPrank(maker);
        usdc.approve(address(otc), amountIn);
        
        otc.createIntent(address(usdc), amountIn, address(weth), amountOut, deadline);
        vm.stopPrank();

        // Check 1: Escrow is funded correctly
        assertEq(usdc.balanceOf(address(otc)), amountIn);

        // ==========================================
        // STEP 2: Taker executes the intent
        // ==========================================
        vm.startPrank(taker);
        weth.approve(address(otc), amountOut);
        
        otc.executeIntent(0); // Execute Order ID 0
        vm.stopPrank();

        // Check 2: Swap was successful (Atomic Settlement)
        assertEq(usdc.balanceOf(taker), amountIn); // Taker got the USDC
        assertEq(weth.balanceOf(maker), amountOut); // Maker got the WETH
        assertEq(usdc.balanceOf(address(otc)), 0); // Escrow is empty
    }

    function testRevert_UnwhitelistedUserCannotCreateIntent() public {
        uint64 deadline = uint64(block.timestamp + 1 hours);
        
        vm.startPrank(hacker); // Hacker is not whitelisted
        vm.expectRevert(abi.encodeWithSelector(InstitutionalOTC.NotWhitelisted.selector, hacker));
        otc.createIntent(address(usdc), 100, address(weth), 50, deadline);
        vm.stopPrank();
    }
}