#Hello Crypto


The "Hello World" of blockchain and cryptogames! (ノ ˘_˘)ノ 。゜。ﾟ

Live demo here: <https://polats.github.io/hello-crypto>

## Getting Started


Read the GitHub project.
Let’s build it from scratch.
Check out the source code
[Diagram]
I. Creating The ERC20 Token
Set up environment
install node + npm
npm install -g truffle
truffle init
npm install zeppelin-solidity

Create Token
Create sample token — go into node_modules and copy simple token code
change import
create migration
truffle develop (note on console and ganache)
truffle migrate (note on compile)

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

II. Interact with token from your app
Download hello-world app


(optional) Setup web3 javascript console
we will need a library to allow us to interact with the blockchain like truffle develop. This will vary depending on the app we’re making, but for web games we’ll be using web3 + javascript.
npm install -g lite-server
create index.html
lite-server
download web3.min.js
load web3.js on index.html

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



download cryptoitem example game with frontend (explain cheating, but this is the step most developers will be used to) This is where it gets a bit dicey, as because blockchain support is still in its infancy, and it would depend on what game engine we sue. For now let’s use this frontend i created built on one of my favorite frameworks,

This part is what we game developers need to build together. I’ve shared part of this on hello world, and our efforts in making a mobile unity3d blockchain wallet over at unity3d-blockchain wallet. 
Chat with us at our telegram group.


Thank you!
