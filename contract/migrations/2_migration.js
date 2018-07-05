/* global artifacts */

const AttendManager = artifacts.require('AttendManager.sol');

module.exports = function(deployer) {
  deployer.deploy(AttendManager);
};
