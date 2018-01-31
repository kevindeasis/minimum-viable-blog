pragma solidity ^0.4.19;

contract proxyDelegatorSimple {
    address public contractOwner;
    address public contractAddress;

    modifier isContractOwner {
        require(msg.sender == contractOwner);
        _;
    }

    function proxyDelegatorSimple(address _firstContractAddress) public{
        contractAddress = _firstContractAddress;
        contractOwner = msg.sender;
    }

    function newContract(address _newContractAddress) public isContractOwner() {
        contractAddress = _newContractAddress;
    }

    function () public {
        assembly {
            
        }
    }
}