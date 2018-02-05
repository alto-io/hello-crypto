
window.onload = function()
{
  // if mobile, inform user to visit desktop and exit function
  if (settings.isMobile) {
    document.getElementById('metamask-prompt').textContent = 'Visit this page on your desktop browser for Metamask support.';
    document.getElementById('metamask-prompt').style.display = 'block';
    return;
  }

  if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
    document.getElementById('wallet-info').textContent=web3Provider.constructor.name;

  } else {
    // If no injected web3 instance is detected, fallback to the TestRPC
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    document.getElementById('wallet-info').textContent="HttpProvider";
  }

  document.getElementById('wallet-info').style.display = 'block';


  web3 = new Web3(web3Provider);

  // Get account ID
  accountID = web3.eth.accounts[0];
  document.getElementById('key').textContent=accountID;
  document.getElementById('key').style.display = 'block';

  // Get balances in BigNumbers
  var ethBalance;

  web3.eth.getBalance(accountID, function(error, result){
      if(!error)
      {
          ethBalance = result;
          document.getElementById('ethbal').textContent=result.toString() + " wei";
          document.getElementById('ethbal').style.display = 'block';
      }
      else
          console.error(error);
  });

  var simpleTokenContract;
  var simpleTokenInstance;
  var errorMsg;

  // store the contract
  $.getJSON('build/contracts/SimpleToken.json', function(data) {

    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var SimpleTokenArtifact = data;
    simpleTokenContract = TruffleContract(SimpleTokenArtifact);

    // Set the provider for our contract
    simpleTokenContract.setProvider(web3Provider);

    // invoke the contract to get the balance
    simpleTokenContract.deployed().then(function(instance) {
      simpleTokenContractInstance = instance;

      return simpleTokenContractInstance.balanceOf(accountID);
    }).then(function(result) {
      document.getElementById('simbal').textContent=result.toString()
      document.getElementById('simbal').style.display = 'block';      
    }).catch(function(err) {
      document.getElementById('simbal').textContent=err.toString()
    });
  });


}
