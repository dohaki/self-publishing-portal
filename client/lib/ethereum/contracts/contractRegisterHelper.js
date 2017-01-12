const abiArray = [{
    "constant": false,
    "inputs": [{"name": "creator", "type": "address"}, {
        "name": "partner",
        "type": "address"
    }, {"name": "contractAddress", "type": "address"}],
    "name": "contractCreated",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "creator", "type": "address"}, {
        "indexed": false,
        "name": "partner",
        "type": "address"
    }, {"indexed": false, "name": "contractAddress", "type": "address"}],
    "name": "ContractCreated",
    "type": "event"
}];

const address = "0x07f95f32da24404537aa5952379c8ca436a2bd50";

ContractRegisterContract = web3.eth.contract(abiArray).at(address);

ContractRegisterContract.ContractCreated().watch((error, result) => {
    if (error) console.error(error);
    else {
        console.log('Contract created!', result);
    }
});