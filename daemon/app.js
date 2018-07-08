const noble = require('noble');

noble.on('stateChange', (state)=>{
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral)=>{
  console.log(peripheral.address);
  console.log(peripheral.rssi);
  peripheral.on('rssiUpdate', (rssi)=>{
    console.log(rssi);
    console.log('!!!')
  });
});
