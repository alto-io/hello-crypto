# Hello Crypto


The "Hello World" of blockchain and cryptogames! (ノ ˘_˘)ノ 。゜。ﾟ

Live demo here: <https://polats.github.io/hello-crypto>

## Quickstart

To just run the project, install [Node and npm](https://nodejs.org/en/), and then run lite-server:

```
npm install -g lite-server
lite-server

```
## Creating It From Scratch
If we want to learn how the pieces come together, it helps to go through the process of creating the Hello Crypto app ourselves.

We can break it down into 3 parts:

* (1) interacting with the Ethereum blockchain in your app,
* (2) creating our own ERC20 token, and
* (3) deploying it on the blockchain.

----

### Interacting with the Ethereum Blockchain in Your App

#### 1. Install Metamask

If you haven't yet, install the [Metamask Extension](https://metamask.io/) on your browser.

In order to interact with the blockchain, we will need a wallet address from which to call transactions from. Currently the easiest way to create one is by using Metamask. And since we're making a web app, Metamask also conveniently provides us helper functions that we'll be using later.

#### 2. Create a new project directory and copy starter files

Create a new directory, and then copy the following files from the Hello Crypto project onto that directory:

```
index-2.html
js/web3.min.js
js/truffle-contract.min.js
```

Rename index-2.html to index.html:

```
mv index-2.html index.html
```

The javascript libraries we copied over are [web3.js, the Ethereum Javascript API](https://github.com/ethereum/web3.js) and [truffle-contract](https://github.com/trufflesuite/truffle-contract), a library to help us call Blockchain contracts.

#### 3. Use lite-server to run the app

Install lite-server and run the app:

```
npm install -g lite-server
lite-server
```

The browser should automatically start the web app from index.html and you should see a screen similar to the one below:

![Alt text](ss/1.png?raw=true "First Run")

The app uses our wallet account in Metamask and the web3.js library to interact with the blockchain-- it queries the account's ETH balance, and uses Javascript to display them on the page. If your wallet has ETH it should show the current amount here.

**Note:** The SIM Balance error is expected, it appears since we don't have that custom token's smart contract deployed on the blockchain. We will fix that in the next section.

----

### Creating Our Own ERC20 Token

Creating a custom ERC20 Token is usually the first use case for those learning how to deploy smart contracts. We'll see how to do this using a simple workflow, and then integrate the ERC20 Token it with our web app.

#### 1. Set up Truffle then truffle init

[Truffle](http://truffleframework.com/) is the easiest Ethereum development framework to learn, and is a good fit for us since we've already started using Node and NPM for our web app. Install it via the terminal:

```
npm install -g truffle
```
And then initialize our project by typing:

```
truffle init
```

Once done you'll see a bunch of new files and directories created in our project directory. These are Truffle's deployment scripts and config files.

#### 2. Install OpenZeppelin

We will be using the example token smart contract from [OpenZeppelin](https://github.com/OpenZeppelin/zeppelin-solidity). This is a good starting point as they're peer-reviewed smart contracts that follow standards defined by the community. We can use them by simply downloading them also from npm:

```
npm install @openzeppelin/contracts
```

You should see a node_modules/@openzeppelin folder once the command completes.

#### 3. Open StandardToken.sol

This is almost a copy of `@openzeppelin/contracts/token/ERC20/ERC20.sol` which implements the IERC20.sol contract interface but instead of having private member variables we will leave them as public.

#### 4. Open SimpleToken.sol

This is our own ERC-20 custom token which inherits from StandardToken.

![Alt text](ss/2.png?raw=true "Change Import")

#### 4. Add Deployment Script

We then need to add a deployment script to the migrations folder so that truffle can deploy our SimpleToken to a blockchain. Create a **2_deploy_token.js** file in the migrations directory, and add the following lines:

```
var SimpleToken = artifacts.require("SimpleToken");

module.exports = function(deployer) {
  deployer.deploy(SimpleToken);
};
```

![Alt text](ss/3.png?raw=true "Deployment Script")

#### 5. Create local blockchain with truffle develop

We now setup a local test blockchain by using Truffle, which can be done simply by typing:

```
truffle develop
```
![Alt text](ss/4.png?raw=true "Truffle Develop")

Once successful we should see the same screen, with us entering the truffle develop console.

#### 6. Deploy the smart contract via truffle migrate

Now that we have a local test blockchain, we can try deploying the SimpleToken contract that we copied from OpenZeppelin. We can do this from within the truffle develop console by typing in:

```
migrate
```

This will compile our smart contracts into JSON under the build folder, and also deploy the smart contracts unto the local blockchain. A successful run would look similar to the screen below.

![Alt text](ss/5.png?raw=true "Truffle Migrate")

Congratulations, you have just deployed an ERC20 Token onto a blockchain! (It's on a local development blockchain for now, we'll see how to deploy to live blockchains in the next section)

#### 7. Connect to the local blockchain from Metamask

Now that we've deployed our contract on a local blockchain, let's see it in action on our web app. Go back to our running web app on the browser (if you closed it, open a new tab and start **lite-server** again).

In Metamask, change the network that we're connecting to by clicking the dropdown on the upper left of the extension's page. Select **Custom RPC**, and input the default host used by truffle develop: **http://localhost:9545/**

You should see the error we had previously is now gone, as our web app is now successfully querying the custom token balance from the local blockchain.

![Alt text](ss/6.png?raw=true "Local Blockchain")

**Note:** Truffle uses the first account in Truffle develop as the contract creator. In the screenshot above, we imported that account in Metamask using its private key. As the OpenZeppelin SimpleToken sets the contract creator as the holder of all the initial supply of our custom token, we see that the Truffle Account's Sim balance contains exactly that.

## IN PROGRESS


(optional) interact with contract on truffle console

Send ETH

web3.eth.accounts

contract creator is web3.eth.accounts[0]

recipientAccount = web3.eth.accounts[1]

web3.eth.getBalance 0 and 1

web3.eth.sendTransaction({from:Account1, to:Account2, value: 10000})


Send SIM

contractInstance = SimpleToken.deployed().then(i => contractInstance = i)

contractInstance.totalSupply

contractInstance.balanceOf(web3.eth.accounts[0])

contractInstance.balanceOf(recipientAccount)

What is Big Number?

contractInstance.transfer(recipientAddress, 5000)

check new balance


(optional) Setup web3 javascript console

Perform previous ETH transfer operations

web3.eth

add truffle-contract.min.js

load simpleToken json

return balance

Add make-it-rain.html


III. Deploy on the Blockchain

To interact with the blockchain, we’ll need to have our own wallet account. We’ve been using Truffle develop accounts, but now we should use our own by creating one

Install Metamask, remember mnemonic

Get some ETH from faucet inside metamask

setup HDWallet provider, then connect to ropsten
migrate

Change make-it-rain settings to call ropsten on testnet instead

Change settings to use ETH instead

Show deployed website