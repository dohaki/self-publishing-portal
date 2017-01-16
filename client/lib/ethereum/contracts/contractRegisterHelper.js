import {subscribeToContract} from '/client/lib/ethereum/contracts/individualContractHelper';
import {insertNewContract} from '/client/lib/helpers/contractCollectionHelper';

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
    "name": "contractChanged",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "contractAddress", "type": "address"}, {
        "name": "creator",
        "type": "address"
    }, {"name": "contractPartner", "type": "address"}],
    "name": "contractAccepted",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "contractAddress", "type": "address"}, {
        "name": "creator",
        "type": "address"
    }, {"name": "contractPartner", "type": "address"}],
    "name": "contractFullfilled",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
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
    "constant": false,
    "inputs": [{"name": "contractAddress", "type": "address"}, {
        "name": "creator",
        "type": "address"
    }, {"name": "contractPartner", "type": "address"}],
    "name": "contractDeclined",
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
    "name": "ContractChanged",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "contractAddress", "type": "address"}, {
        "indexed": false,
        "name": "creator",
        "type": "address"
    }, {"indexed": false, "name": "contractPartner", "type": "address"}],
    "name": "ContractAccepted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "contractAddress", "type": "address"}, {
        "indexed": false,
        "name": "creator",
        "type": "address"
    }, {"indexed": false, "name": "contractPartner", "type": "address"}],
    "name": "ContractDeclined",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "contractAddress", "type": "address"}, {
        "indexed": false,
        "name": "creator",
        "type": "address"
    }, {"indexed": false, "name": "contractPartner", "type": "address"}],
    "name": "ContractFullfilled",
    "type": "event"
}];

const address = "0x68a49c40038e5c8dc5ac30c51a8f5d4e42b466ae";

ContractRegisterContract = web3.eth.contract(abiArray).at(address);

const ContractCreatedEvent = ContractRegisterContract.ContractCreated({}, {
    fromBlock: 0,
    toBlock: 'latest'
});

const ContractChangedEvent = ContractRegisterContract.ContractChanged({}, {
    fromBlock: 0,
    toBlock: 'latest'
});

const ContractAcceptedEvent = ContractRegisterContract.ContractAccepted({}, {
    fromBlock: 0,
    toBlock: 'latest'
});

const ContractDeclinedEvent = ContractRegisterContract.ContractDeclined({}, {
    fromBlock: 0,
    toBlock: 'latest'
});

const ContractFullfilledEvent = ContractRegisterContract.ContractFullfilled({}, {
    fromBlock: 0,
    toBlock: 'latest'
});

ContractCreatedEvent.watch((error, result) => {
    if (error) console.error(error);
    else if (result.args.creator === web3.eth.accounts[0] || result.args.contractPartner === web3.eth.accounts[0]) {
        const contract = {
            contractAddress: result.args.contractAddress,
            contractPartner: result.args.contractPartner,
            contractTypes: result.args.contractTypes,
            valueType: new BigNumber(result.args.valueTypeId).toNumber(),
            creator: result.args.creator,
            description: result.args.description,
            name: result.args.name,
            fixReward: new BigNumber(result.args.fixReward).toNumber(),
            varReward: new BigNumber(result.args.varReward).toNumber(),
            isAccepted: result.args.isAccepted,
            isFullfilled: result.args.isFullfilled,
            isActive: true
        };
        console.log('Contract created!', contract);
        insertNewContract(contract, () => {
            subscribeToContract(result.args.contractAddress);
        });
    }
});


ContractChangedEvent.watch((error, result) => {
    if (error) console.error(error);
    else if (result.args.creator === web3.eth.accounts[0] || result.args.contractPartner === web3.eth.accounts[0]) {
        const contract = {
            contractAddress: result.args.contractAddress,
            contractPartner: result.args.contractPartner,
            contractTypes: result.args.contractTypes,
            valueType: new BigNumber(result.args.valueTypeId).toNumber(),
            creator: result.args.creator,
            description: result.args.description,
            name: result.args.name,
            fixReward: new BigNumber(result.args.fixReward).toNumber(),
            varReward: new BigNumber(result.args.varReward).toNumber(),
            isAccepted: result.args.isAccepted,
            isFullfilled: result.args.isFullfilled,
            isActive: true
        };
        console.log('Contract changed!', contract);
        // TODO update contract in db
    }
});

ContractAcceptedEvent.watch((error, result) => {
    if (error) console.error(error);
    else if (result.args.creator === web3.eth.accounts[0] || result.args.contractPartner === web3.eth.accounts[0]) {
        console.log('Contract accepted!', result);
        // TODO update contract in db
    }
});

ContractDeclinedEvent.watch((error, result) => {
    if (error) console.error(error);
    else if (result.args.creator === web3.eth.accounts[0] || result.args.contractPartner === web3.eth.accounts[0]) {
        console.log('Contract declined!', result);
        // TODO update contract in db
    }
});

ContractFullfilledEvent.watch((error, result) => {
    if (error) console.error(error);
    else if (result.args.creator === web3.eth.accounts[0] || result.args.contractPartner === web3.eth.accounts[0]) {
        console.log('Contract changed!', result);
        // TODO update contract in db
    }
});