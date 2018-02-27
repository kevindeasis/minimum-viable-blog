//npm run dev

pragma solidity ^0.4.18;

contract Delegator {
    
    address public contractAddress;
    uint256 public total;
    bool public isCalled;

        event addVariables(uint256 var1, uint256 var2);
                event Total(uint256 total);


    function Delegator() public {
        isCalled = false;
    }

    function changeContract(address _firstContractAddress) public {
        contractAddress = _firstContractAddress;
    }

    function() public payable {
        isCalled = true;
        require(contractAddress.delegatecall(msg.data));
    }
}
