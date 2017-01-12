import {subscribeToContract} from '/client/lib/ethereum/contracts/individualContractHelper';

const abiArray = [{
    "constant": false,
    "inputs": [{"name": "contractAddress", "type": "address"}, {
        "name": "name",
        "type": "string"
    }, {"name": "description", "type": "string"}, {"name": "creator", "type": "address"}, {
        "name": "contractPartner",
        "type": "address"
    }, {"name": "fixReward", "type": "uint256"}, {"name": "varReward", "type": "uint256"}, {
        "name": "valueTypeId",
        "type": "uint256"
    }, {"name": "contractTypes", "type": "bool[4]"}, {"name": "isAccepted", "type": "bool"}, {
        "name": "isFullfilled",
        "type": "bool"
    }],
    "name": "contractCreated",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "contractAddress", "type": "address"}, {
        "indexed": false,
        "name": "name",
        "type": "string"
    }, {"indexed": false, "name": "description", "type": "string"}, {
        "indexed": false,
        "name": "creator",
        "type": "address"
    }, {"indexed": false, "name": "contractPartner", "type": "address"}, {
        "indexed": false,
        "name": "fixReward",
        "type": "uint256"
    }, {"indexed": false, "name": "varReward", "type": "uint256"}, {
        "indexed": false,
        "name": "valueTypeId",
        "type": "uint256"
    }, {"indexed": false, "name": "contractTypes", "type": "bool[4]"}, {
        "indexed": false,
        "name": "isAccepted",
        "type": "bool"
    }, {"indexed": false, "name": "isFullfilled", "type": "bool"}],
    "name": "ContractCreated",
    "type": "event"
}];

const address = "0x5e54da5df1526711ee28d9c639890c08e169e4dd";

ContractRegisterContract = web3.eth.contract(abiArray).at(address);

const ContractCreatedEvent = ContractRegisterContract.ContractCreated({partner: web3.eth.accounts[0]}, {
    fromBlock: 0,
    toBlock: 'latest'
});

ContractCreatedEvent.watch((error, result) => {
    if (error) console.error(error);
    else {
        console.log('Contract created!', result);
        subscribeToContract(result.args.contractAddress);
    }
});