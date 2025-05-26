module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     
      port: 7545,            
      network_id: "*",       
      gas: 6721975,          
      gasPrice: 20000000000, 
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", 
      gas: 6721975,
      gasPrice: 20000000000,
    }
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.19",    
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        viaIR: true, // ✅ Add this line to enable IR compilation
        evmVersion: "byzantium"
      }
    }
  }
};
