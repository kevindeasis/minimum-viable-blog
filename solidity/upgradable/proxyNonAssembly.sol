pragma solidity ^0.4.19;

contract Upgradable {

    address owner;

    modifier notInitialized() {
        require(owner == 0x0);
        _;
    }

    function initWaller(address _owner) notInitialized() {
        owner = _owner;
    }
}
