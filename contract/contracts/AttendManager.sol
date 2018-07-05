pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Whitelist.sol";
// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
// import "openzeppelin-solidity/contracts/ownership/Whitelist.sol";

contract AttendManager is Ownable, Whitelist {
    event DeviceRegisted(bytes6 deviceAddr);
    event DeviceUnregisted(bytes6 deviceAddr);
    event CheckedIn(uint timestamp, bytes6 deviceAddr);
    event CheckedOut(uint timestamp, bytes6 deviceAddr);

    enum LogType {
        CheckOut,
        CheckIn
    }

    struct Log {
        uint timestamp;
        LogType logType;
        bytes6 deviceAddr;
    }

    Log[] public logs;
    mapping(bytes6=>bool) public deviceRegister;

    function registDevice(bytes6 deviceAddr) public onlyOwner {
        deviceRegister[deviceAddr] = true;
        emit DeviceRegisted(deviceAddr);
    }

    function unregistDevice(bytes6 deviceAddr) public onlyOwner {
        require(deviceRegister[deviceAddr]);
        deviceRegister[deviceAddr] = false;
        emit DeviceUnregisted(deviceAddr);
    }

    function isDeviceRegistered(bytes6 deviceAddr) public view returns(bool) {
        return deviceRegister[deviceAddr];
    }

    function checkIn(uint timestamp, bytes6 deviceAddr) public onlyWhitelisted {
        require(isDeviceRegistered(deviceAddr));
        logs.push(Log(timestamp, LogType.CheckIn, deviceAddr));
        emit CheckedIn(timestamp, deviceAddr);
    }

    function checkOut(uint timestamp, bytes6 deviceAddr) public onlyWhitelisted {
        require(isDeviceRegistered(deviceAddr));
        logs.push(Log(timestamp, LogType.CheckOut, deviceAddr));
        emit CheckedOut(timestamp, deviceAddr);
    }
}
