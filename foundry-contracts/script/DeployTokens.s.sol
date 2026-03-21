// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {MockERC20} from "../src/MockERC20.sol";

contract DeployTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address myWallet = vm.addr(deployerPrivateKey); 

        vm.startBroadcast(deployerPrivateKey);

       
        MockERC20 usdc = new MockERC20("Mock USDC", "USDC");
        MockERC20 weth = new MockERC20("Mock WETH", "WETH");

        
        usdc.mint(myWallet, 100000 * 10**18);
        weth.mint(myWallet, 100 * 10**18);

        console.log("USDC Deployed to:", address(usdc));
        console.log("WETH Deployed to:", address(weth));

        vm.stopBroadcast();
    }
}