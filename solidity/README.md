# Solidity

## Tldr

Visibility Modifiers
public - method can be from internal and external calls
external - can be called externally but not internally
private - can only be called by inside the contract
internal - can be called within the contract and any other contract inheriting the contract that is implementing the internal
view - nothing is modified in the blokchain
pure - nothing modified and nothing read in the blockchain
view and pure cost no gas externally, but can cost gas with internal calls

Implemented modifiers
can be combined together
should end with _; 

payable - used for receiving ether, as if you send ether to a non payable will not work

require(msg.value == 0.001 ether);
OnlineStore.buySomething({from: web3.eth.defaultAccount, value: web3.utils.toWei(0.001)})

Ownable contract
owner object
onlyOwner modifier


# Truffle