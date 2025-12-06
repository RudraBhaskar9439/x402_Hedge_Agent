// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockERC20
 * @dev Simple ERC20 token for testing purposes.
 *      Anyone can mint in this example – good for local tests,
 *      NOT for production use.
 */
contract MockERC20 is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        // Mint initial supply to the deployer
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Mint tokens to any address.
     *      Public & unrestricted for testing convenience.
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
