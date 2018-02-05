var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "desert chest husband hedgehog kit galaxy opinion someone truly flag scorpion marble";

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/kHINF1xpjrbTrUgnr8Dk")
      },
      network_id: 3,
      gas: 4600000
    }
  }
};
