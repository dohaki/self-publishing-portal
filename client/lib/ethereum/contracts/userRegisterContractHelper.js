import {Session} from 'meteor/session';

const abiArray = [{
    "constant": false,
    "inputs": [],
    "name": "close",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "userName", "type": "string"}],
    "name": "join",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "users",
    "outputs": [{"name": "userName", "type": "string"}],
    "payable": false,
    "type": "function"
}, {"inputs": [], "payable": false, "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "userAddress", "type": "address"}, {
        "indexed": false,
        "name": "userName",
        "type": "string"
    }],
    "name": "JoinSuccess",
    "type": "event"
}];

const address = "0xfa65e6da80e8690b0ec039c476a3c8d63dc26fa1";

UserRegisterContract = web3.eth.contract(abiArray).at(address);

export function getUserNameByAddressFromContract(address) {
    UserRegisterContract.users(address, (error, result) => {
       if (error)
           console.error(error);
       else {
           Users.upsert({userAddress: address}, {userAddress: address, userName: result});
           return result;
       }
    });
}

UserRegisterContract.JoinSuccess().watch(function (error, result) {
    if (error) {
        console.error('userRegisterHelper.js - JoinSuccess event');
    } else {
        console.log('event JoinSuccess fired!');
        console.log(result);
    }
});