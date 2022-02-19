// npm i fs
const fs = require('fs');
// Instalación de: npm i @truffle/hdwallet-provider
const HDWalletProvider = require('@truffle/hdwallet-provider');
// Clave secreta: 12 palabras de la Wallet
const mnemonic = fs.readFileSync(".secret").toString().trim();
// const mnemonic = "Tus 12 palabras"
module.exports = {

  networks: {

    // Ganache 
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    // Binance Smart Chain: BSC
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545"),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    // Polygon: MATIC
    // Necesitamos una cuenta en: https://rpc.maticvigil.com/
    // ID: https://rpc-mumbai.maticvigil.com/v1/5a211f3a3fb8d4110887e0eeae262a4bd36c2774
    matic : {
      provider: () => new HDWalletProvider(mnemonic, "https://rpc-mumbai.maticvigil.com/v1/5a211f3a3fb8d4110887e0eeae262a4bd36c2774"),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    
    // Rinkeby: https://infura.io/dashboard/ethereum/2cf64f38e4234f1fb073bdc5f9e1b875/settings
    rinkeby : {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/2cf64f38e4234f1fb073bdc5f9e1b875"),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  contracts_build_directory: "./src/contracts/",
  compilers: {
    solc: {
      version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      }
    }
  },

  db: {
    enabled: false,  
    host: "127.0.0.1",
    adapter: {
      name: "sqlite",
      settings: {
        directory: ".db"
      }
    }
  }
};
