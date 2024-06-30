// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20 {
    constructor() payable ERC20("Degen", "DGN") {
    }

    function mint(address account, uint256 amount) external  returns (bool) {
        require(account != address(0) && amount > 0, "Invalid mint input");
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint256 amount) external  returns (bool) {
        require(account != address(0) && amount > 0, "Invalid burn input");
        _burn(account, amount);
        return true;
    }

    function buy() external payable returns (bool) {
        require(msg.value > 0, "Invalid purchase input");
        uint256 amount = msg.value * 1000;
        _mint(msg.sender, amount);
        return true;
    }
}