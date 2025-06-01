// src/services/web3Service.js
import Web3 from 'web3';

const CONTRACT_ADDRESS = "0xfE2787a25737aEE7a3ae24305F874119506e5935";


const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "recordId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "crime",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "addedBy",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_crime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_victim",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_amount",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_officer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_recordId",
        "type": "uint256"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "crime",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "victim",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "amount",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "officer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "addedBy",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "searchRecordsByName",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllRecordIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

class Web3Service {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.account = null;
  }

  async init() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      return true;
    }
    return false;
  }

  async connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      this.account = accounts[0];
      return accounts[0];
    } catch (error) {
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  }

  async addCriminalRecord(recordData) {
    try {
      const result = await this.contract.methods.addRecord(
        recordData.name,
        recordData.crime,
        recordData.location,
        recordData.victim,
        recordData.amount,
        recordData.description,
        recordData.category,
        recordData.officer,
        recordData.ipfsHash || ""
      ).send({
        from: this.account,
        gas: 500000
      });
      return result;
    } catch (error) {
      throw new Error('Failed to add record: ' + error.message);
    }
  }

  async getRecord(recordId) {
    try {
      const result = await this.contract.methods.getRecord(recordId).call();
      return {
        id: result.id,
        name: result.name,
        crime: result.crime,
        location: result.location,
        victim: result.victim,
        amount: result.amount,
        description: result.description,
        category: result.category,
        officer: result.officer,
        ipfsHash: result.ipfsHash,
        timestamp: result.timestamp,
        addedBy: result.addedBy,
        isActive: result.isActive
      };
    } catch (error) {
      throw new Error('Failed to get record: ' + error.message);
    }
  }

  async searchRecordsByName(name) {
    try {
      const recordIds = await this.contract.methods.searchRecordsByName(name).call();
      const records = [];
      
      for (let id of recordIds) {
        const record = await this.getRecord(id);
        records.push(record);
      }
      
      return records;
    } catch (error) {
      throw new Error('Failed to search records: ' + error.message);
    }
  }

  async getAllRecords() {
    try {
      const recordIds = await this.contract.methods.getAllRecordIds().call();
      const records = [];
      
      for (let id of recordIds) {
        const record = await this.getRecord(id);
        if (record.isActive) {
          records.push(record);
        }
      }
      
      return records;
    } catch (error) {
      throw new Error('Failed to get all records: ' + error.message);
    }
  }

  async getRecordCount() {
    try {
      return await this.contract.methods.getRecordCount().call();
    } catch (error) {
      throw new Error('Failed to get record count: ' + error.message);
    }
  }
}

export default new Web3Service();