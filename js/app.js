
window.onload = function()
{
  // vars
  this.buttonRaining = true;
  this.currentRainingEth = 0;
  this.rainObject = {};
  this.counterObject = {};
  this.counterBGObject = {};
  this.walletInfo = {};

  // uses Ethereum balance if true, otherwise gets SIM balance
  useEth = true;

  bindUI();

  // if mobile, inform user to visit desktop and exit function
  if (settings.isMobile) {
    document.getElementById('metamask-prompt').textContent = 'Visit this page on your desktop browser for Metamask support.';
    document.getElementById('metamask-prompt').style.display = 'block';
    return;
  }

  // Get web3 provider
  if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
    this.walletInfo.provider=web3Provider.constructor.name;
  } else {
    // If no injected web3 instance is detected, fallback to the TestRPC
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    this.walletInfo.provider="HttpProvider";
  }

  web3 = new Web3(web3Provider);

  // Get account ID
  this.walletInfo.accountID = web3.eth.accounts[0];

  // Get token balances
  if (useEth)

  {
    web3.eth.getBalance(this.walletInfo.accountID, function(error, result){
        if(!error)
        {
            walletInfo.ETHBalance = web3.fromWei(result, "ether").toFixed(2) + " ETH";
            rainObject.data.maxDrops = web3.fromWei(result, "ether");
            displayWallet();
        }
        else
            console.error(error);
    });
  }

  else // use custom SimpleToken SIM

  {

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

        return simpleTokenContractInstance.balanceOf(this.walletInfo.accountID);
      }).then(function(result) {
        walletInfo.SIMBalance = result.toString();
        displayWallet();

      }).catch(function(err) {
        walletInfo.SIMBalanceError=err.toString();
      });
    });

  }

  displayWallet();

}

function bindUI()
{
  document.getElementById('rainbutton').onclick = function() {
    makeItRain();
  }

  var i = document.querySelector('iframe');
  this.rainObject = i.contentWindow.document.body.querySelector('a-scene[rain]').components.rain;
  this.counterBGObject = i.contentWindow.document.body.querySelector('#counter-bg');
  this.counterObject = i.contentWindow.document.body.querySelector('#counter');
}

// need to access it from inside the iframe, so hacky!
function makeItRain()
{
  var rain = this.rainObject;

  rain.data.isRaining = this.buttonRaining;

  this.counterBGObject.setAttribute("visible", this.buttonRaining);

  if (!rain.data.isRaining)
  {
    document.getElementById('rainbutton').textContent = "(ノ ˘_˘)ノ 。゜。ﾟ"
  }

  else {
    document.getElementById('rainbutton').textContent = "｡.｡. .｡.ノ( º _ ºノ)"
    this.rainObject.data.currentDrop = 0;
  }

  // switch button started
  this.buttonRaining = !this.buttonRaining;

}

function displayWallet()
{
  var walletInfo = this.walletInfo;

/*
  document.getElementById('wallet-info').textContent=walletInfo.provider;
  document.getElementById('wallet-info').style.display = 'block';
*/

  var l = walletInfo.accountID.length;

  document.getElementById('key').textContent= "Wallet ID: " +
  walletInfo.accountID.slice(0, 8) + "......" + walletInfo.accountID.slice(l-8, l);
  document.getElementById('ethbal').textContent="Account Balance: " + walletInfo.ETHBalance;
  document.getElementById('simbal').textContent=walletInfo.SIMBalance;

  document.getElementById('key').style.display = 'block';
  document.getElementById('ethbal').style.display = 'block';
  document.getElementById('simbal').style.display = 'block';

}
