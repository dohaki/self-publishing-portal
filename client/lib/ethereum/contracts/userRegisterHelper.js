import {Session} from 'meteor/session';

const abiArray = [{
    "constant": false,
    "inputs": [{"name": "userName", "type": "string"}, {"name": "role", "type": "string"}],
    "name": "join",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "close",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}],
    "name": "users",
    "outputs": [{"name": "userName", "type": "string"}, {"name": "role", "type": "string"}],
    "payable": false,
    "type": "function"
}, {"inputs": [], "payable": false, "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "userAddress", "type": "address"}, {
        "indexed": false,
        "name": "role",
        "type": "string"
    }, {"indexed": false, "name": "userName", "type": "string"}],
    "name": "JoinSuccess",
    "type": "event"
}];

const address = "0x41e72ab3f8f277ea0e3ffd9a606e2f9c7f4d13fe";

UserRegisterContract = web3.eth.contract(abiArray).at(address);

UserRegisterContract.JoinSuccess().watch(function (error, result) {
    if (error) {
        console.log('JOIN SUCCESS EVENT ERROR');
    } else {
        console.log('JOIN SUCCESS');
        console.log(result);
        Session.set('mining', false);
        FlowRouter.go('/');
    }
});