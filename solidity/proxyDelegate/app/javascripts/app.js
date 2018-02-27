// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
const SolidityFunction = require('web3/lib/web3/function');

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import delegator_artifacts from '../../build/contracts/Delegator.json'
import delegate_artifacts from '../../build/contracts/Delegate.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var Delegator = contract(delegator_artifacts);
var Delegate = contract(delegate_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var delegate
var delegtr

window.App = {
  start: function() {
    var self = this;


    Delegate.deployed().then(function(ins){
      console.log(ins)
      console.log("then then")
      // delegate=ins
    });

    console.log(delegator_artifacts)
    console.log(delegate_artifacts)
    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    Delegate.setProvider(web3.currentProvider);
    Delegator.setProvider(web3.currentProvider);

    console.log("our contract delegates")
    console.log(Delegate)
    console.log(Delegator)
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      console.log("accounts accts")
      console.log(err)
      console.log(accs)
      console.log("end")
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },
  delegateAdd: function() {
    delegate.add.sendTransaction(1,2,{from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"},
  
    (err, res) => { 
      /** do something with results **/ 
      console.log(err)
      console.log(res)
      console.log("delegate add look up")
    }

  )
  },

  delegatorAdd: function() {
    // delegtr.total.call()
    // .then(function(result){ 
    //   console.log(result); 
    // });


  // var delegtrTotalData = delegtr.total.getData();
  // console.log(delegtrTotalData)
  console.log("delegatorAdd")

//   delegtr.add.sendTransaction(1,2,{from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"},
  
//   (err, res) => { 
//     /** do something with results **/ 
//     console.log(err)
//     console.log(res)
//     console.log("delegate add works up")
//   }

// )

var functionDef = new SolidityFunction('', delegate_artifacts.abi[2], '');


// console.log(functionDef)
console.log(functionDef.toPayload([1,2]).data)

  var send = web3.eth.sendTransaction(
    {
        from:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
        ,to: "0x059e17ceb15ef8470b7184b858d356317518aab3"
        ,data:  functionDef.toPayload([1,2]).data //delegtrTotalData
        
    },
    (err, res) => { 
      /** do something with results **/ 
      if (err) {
        console.log("err")
        console.log(err)

      } else {
        console.log("no err")
        console.log(res)

      }
      console.log("delegateAdd look up s")
    }
  );

  //  delegate.total().sendTransaction(undefined,{from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"},
  
  //   (err, res) => { 
  //     /** do something with results **/ 
  //     console.log(err)
  //     console.log(res)
  //     console.log("delegateAdd look up")
  //   }

  // )

  //   (err, res) => { 
  //     /** do something with results **/ 
  //     console.log(err)
  //     console.log(res)
  //     console.log("look up")
  //   }

  // )
  
    // var send = web3.eth.sendTransaction(
    //   {
    //       from:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
    //       ,to: "0x13274fe19c0178208bcbee397af8167a7be27f6f"
    //       ,data:  myCallData
          
    //   },
    //   (err, res) => { 
    //     /** do something with results **/ 
    //     if (err) {
    //       console.log("err")
    //       console.log(err)
  
    //     } else {
    //       console.log("no err")
    //       console.log(res)
  
    //     }
    //     console.log("look up s")
    //   }
    // );

    // console.log("delegateAdd called")
    // console.log(Delegate.deployed().address)
    // console.log(MetaCoin.deployed().address)

    // var delegate;
    // Delegate.deployed().then(function(instance) {
    //   delegate = instance;
    //   return delegate.add(1,2);
    // }).then(function() {
    //   console.log("call back")
    //   console.log(delegate.total())
    //   // self.refreshBalance();
    // }).catch(function(e) {
    //   console.log(e);
    //   console.log("some kind of err; see log.");
    // });
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: account});
    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  }

  console.log(web3.eth.contract)
  var Delegtr = web3.eth.contract(delegator_artifacts.abi);
    var Delegate = web3.eth.contract(delegate_artifacts.abi);


    delegate = Delegate.at("0x058f7ceff4a998e5ce3ce7a8e913e32e9fa52601");
    delegtr = Delegtr.at("0x059e17ceb15ef8470b7184b858d356317518aab3");

    console.log("web3")
    console.log(SolidityFunction)
    console.log(delegate_artifacts.abi[2])
    var functionDef = new SolidityFunction('', delegate_artifacts.abi[2], '');

    console.log("functionDef")

    console.log(functionDef)
    console.log(functionDef.toPayload([1,2]).data)
    // console.log(web3)








    // delegate.add()
    // delegte.deployed().then(function(ins){
    //   console.log('delegt')
    //   console.log(ins)
    //   // delegate=ins
    // });

    console.log("addrs")
    // console.log(Delegtr.options.address)
    console.log(Delegate)
    console.log(delegate)
  //   delegate.add.sendTransaction(1,2,{from: "0x058f7ceff4a998e5ce3ce7a8e913e32e9fa52601"},
  
  //   (err, res) => { 
  //     /** do something with results **/ 
  //     console.log(err)
  //     console.log(res)
  //     console.log("look up")
  //   }

  // )

  var myCallData = delegate.add.getData(1, 2);
  console.log(myCallData)
  console.log("end")

  // var send = web3.eth.sendTransaction(
  //   {
  //       from:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
  //       ,to: "0x059e17ceb15ef8470b7184b858d356317518aab3"
  //       ,data:  myCallData
        
  //   },
  //   (err, res) => { 
  //     /** do something with results **/ 
  //     if (err) {
  //       console.log("err")
  //       console.log(err)

  //     } else {
  //       console.log("no err")
  //       console.log(res)

  //     }
  //     console.log("look up s")
  //   }
  // );


  delegtr.changeContract.sendTransaction("0x058f7ceff4a998e5ce3ce7a8e913e32e9fa52601",{from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"},
  
  (err, res) => { 
    /** do something with results **/ 
    console.log("changeContract result up")

    console.log(err)
    console.log(res)

      
        // delegtr.add.sendTransaction(1,2,{from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"},
        
        // (err, res) => { 
        //   /** do something with results **/ 
        //   console.log(err)
        //   console.log(res)
        //   console.log("delegate add works up")
        // })

  }

)

  // https://ethereum.stackexchange.com/questions/5669/with-web3-js-display-sendtransaction-data-field-from-function-call
  // https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

  // var result = web3.eth.call({
  //   to: "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a", 
  //   data: callData
  // });


  var events = delegtr.allEvents({fromBlock: 0, toBlock: 'latest'});
events.watch(function(error, result){
   console.log("delegator some event")
   console.log(error)
  console.log(result)
});

// would get all past logs again.
events.get(function(error, logs){
  console.log("delegator old events")
  console.log(error)
  console.log(logs)
 });
 window.events = events

var devents = delegate.allEvents({fromBlock: 0, toBlock: 'latest'});
devents.watch(function(error, result){
  console.log(error)
  console.log(result)
   console.log("delegate some event")
});
window.devents = devents


devents.get(function(error, logs){
  console.log("delegate old events")
  console.log(error)
  console.log(logs)
 });

//   var events = delegtr.allEvents();

// // watch for changes
// events.watch(function(error, event){
//   console.log("an event from delegator")
//   if (!error)
//     console.log(event);
// });


// var Devents = delegate.allEvents();

// Devents.watch(function(error, event){
//   console.log("an event from DELEGATW")
//   if (!error)
//     console.log(event);
// });
// // Or pass a callback to start watching immediately
// var events = myContractInstance.allEvents([additionalFilterObject,] function(error, log){
//   if (!error)
//     console.log(log);
// });

// delegtr.changeContract("0x058f7ceff4a998e5ce3ce7a8e913e32e9fa52601")

//0x627306090abaB3A6e1400e9345bC60c78a8BEf57

  App.start();
});
