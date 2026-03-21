// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {InstitutionalOTC} from "../src/InstitutionalOTC.sol";

contract DeployOTC is Script {
    function run() external {
        // Read private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Broadcast transaction to the network
        vm.startBroadcast(deployerPrivateKey);

        // Deploy contract
        InstitutionalOTC otc = new InstitutionalOTC();
        console.log("Institutional OTC deployed to:", address(otc));

        vm.stopBroadcast();
    }
}