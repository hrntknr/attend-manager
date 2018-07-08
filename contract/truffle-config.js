const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = process.env.MNEMONIC;
const accessToken = process.env.INFURA_ACCESS_TOKEN;

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/' + accessToken
        );
      },
      network_id: 3,
      gas: 2000000,
    },
  },
};
