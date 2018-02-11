pragma solidity ^0.4.19;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    // uint alias for uin256
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    // storage are dynamic arrays
    // its also public so theres a getter automatically created for it
    Zombie[] public zombies;

    // K-V mapper with a getter, same method name as identifier
    // of mapper "zombieToOwner"
    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    // private function has _ underscore
    // same with local identifiers
    function _createZombie(string _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
         // stored in memory 
        // because declared inside a function
        // and no explicit keyword
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    // sha typecasting of hex to uint256
    function createRandomZombie(string _name) public {
        require(ownerZombieCount[msg.sender] == 0); // stop executing and throw an error if not true
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createZombie(_name, randDna);
    }

}
