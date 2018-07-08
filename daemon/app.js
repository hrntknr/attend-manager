const noble = require('noble');
const Web3 = require('web3');
const config = require('./config');

const cache = {};
const web3 = new Web3(config.node);
const attendManager = new web3.eth.Contract(config.abi, config.address);

noble.on('stateChange', (state)=>{
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', async (peripheral)=>{
  const addressBytes = `0x${peripheral.address.replace(/:/g, '')}`;

  if (cache[peripheral.address] == null) {
    const isDeviceRegistered = await attendManager.methods.isDeviceRegistered(addressBytes).call();
    cache[peripheral.address] = {
      isDeviceRegistered,
      timeoutHandler: null,
    };
    if (!isDeviceRegistered) {
      setTimeout(() => {
        delete cache[peripheral.address];
      }, config.cache);
    }
  }

  if (cache[peripheral.address].isDeviceRegistered) {
    const time = new Date();
    if (cache[peripheral.address].timeoutHandler != null) {
      clearTimeout(cache[peripheral.address].timeoutHandler);
    }
    cache[peripheral.address].timeoutHandler = setTimeout(async () => {
      const tx = attendManager.methods.checkIn(Math.floor(time/1000), addressBytes);
      console.log(tx);
    }, config.timeout);
  }
});
