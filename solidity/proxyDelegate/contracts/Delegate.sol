pragma solidity ^0.4.18;

contract Delegate {
    address public contractAddress;
    uint256 public total;
    bool public isCalled;

        event addVariables(uint256 var1, uint256 var2);
                event Total(uint256 total);


    function unCall() public {
        isCalled = false;
    }

    function add(uint256 var1, uint256 var2) payable public returns (uint256){
         addVariables(var1, var2);

        total = var1 + var2;

         Total(total);
        return total;
    }
}