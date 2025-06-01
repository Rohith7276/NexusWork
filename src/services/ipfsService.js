// src/services/ipfsService.js
import axios from 'axios';

const PINATA_API_KEY = '04d9cb1172a6d42e5df3';
const PINATA_SECRET_API_KEY = 'eff1660adbcf1b5d0513a86cd7a69a482e4158686a428ae36291ef5fd1a4e33e';

class IPFSService {
  async uploadFile(file) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(url, formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      });
      return res.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading file to Pinata:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(jsonData) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    try {
      const res = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY
        }
      });
      return res.data.IpfsHash;
    } catch (error) {
      console.error(' Error uploading JSON to Pinata:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  getFileUrl(hash) {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }
}

export default new IPFSService();
