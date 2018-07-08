const contractInfo = require('../contract/build/contracts/AttendManager.json')

module.exports = {
  abi: contractInfo.abi,
  address: contractInfo.networks['1'].address,
  node: 'http://localhost:8545',
  cache: 100000,
  timeout: 5*60,
};
