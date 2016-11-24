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
}, {"inputs": [], "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "userAddress", "type": "address"}, {
        "indexed": false,
        "name": "role",
        "type": "string"
    }, {"indexed": false, "name": "userName", "type": "string"}],
    "name": "JoinSuccess",
    "type": "event"
}];
const address = "0x755318f74E5F6191ebc5095606B22C9BE38C8139";

UserRegisterContract = web3.eth.contract(abiArray).at(address);

UserRegisterContract.JoinSuccess().watch(function (error, result) {
    if (error) {
        console.log('JOIN SUCCESS EVENT ERROR');
    } else {
        console.log('JOIN SUCCESS');
        console.log(result);
    }
});