var Delegator = artifacts.require("./Delegator.sol");
var Delegate = artifacts.require("./Delegate.sol");

module.exports = function(deployer) {
    deployer.deploy(Delegate);

    deployer.deploy(Delegator);
  // deployer.link(ConvertLib, MetaCoin);
};
