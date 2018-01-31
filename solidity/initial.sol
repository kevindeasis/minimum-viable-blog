pragma solidity ^0.4.19;

interface Basic20 {
    event Transfer(address indexed _transferFrom, address indexed _transferTo, uint256 value);
    function transfer(address _to, uint256 _amount) public returns (bool success);
    function balanceOf(address _owner) public view returns (uint256);
    function totalSupply() public view returns (uint256);
}

contract someContract is Basic20{
    address private theOwner;
    uint private constant totalCoinSupply = 1000;

    struct Account {
        uint balance;
    }
    
    mapping (address => Account) _accounts;
    
    modifier someModifier {
        require(theOwner == msg.sender);
        _;
    }
    
    function someContract() public {
        theOwner = msg.sender;
    }
    
    function setBalance(uint _newValue) public someModifier payable{
        require(_accounts[msg.sender].balance <= totalCoinSupply); // noticeably incomplete
        _accounts[msg.sender].balance = _newValue;
    }

    function transfer(address _to, uint _amount) public returns (bool success) {
        require(_accounts[msg.sender].balance >= _amount);
        if (_amount > 0 && _amount <= balanceOf(msg.sender)) {
            _accounts[msg.sender].balance -= _amount;
            _accounts[_to].balance += _amount;
            Transfer(msg.sender, _to, _amount);
            return true;
        }
        return false;
    }
    
    function totalSupply() public view returns (uint256) {
        return totalCoinSupply;
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
        return _accounts[_owner].balance;
    }
}