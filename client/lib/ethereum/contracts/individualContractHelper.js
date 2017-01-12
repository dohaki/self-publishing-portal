import {Session} from 'meteor/session';

import * as ContractCollectionHelper from '/client/lib/helpers/contractCollectionHelper';
import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';
import {
    insertPendingTransaction,
    removePendingTransaction,
    failedTransaction
} from '/client/lib/helpers/transactionCollectionHelper';

const abiArray = [{
    "constant": true,
    "inputs": [],
    "name": "creator",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "valueType",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "varReward",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isAccepted",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "acceptContract",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "description",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "contractPartner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fixReward",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isFullfilled",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "contractTypes",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "declineContract",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "_name", "type": "string"}, {
        "name": "_description",
        "type": "string"
    }, {"name": "_contractPartner", "type": "address"}, {"name": "_fixReward", "type": "uint256"}, {
        "name": "_varReward",
        "type": "uint256"
    }, {"name": "valueTypeId", "type": "uint256"}, {"name": "contractTypeIds", "type": "uint256[]"}],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "creator", "type": "address"}, {
        "indexed": false,
        "name": "partner",
        "type": "address"
    }, {"indexed": false, "name": "contractAddress", "type": "address"}],
    "name": "ContractAccepted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "creator", "type": "address"}, {
        "indexed": false,
        "name": "partner",
        "type": "address"
    }, {"indexed": false, "name": "contractAddress", "type": "address"}],
    "name": "ContractDeclined",
    "type": "event"
}];

IndividualContractsSubscribedTo = [];

IndividualContractContract = web3.eth.contract(abiArray);

export function createIndividualContract(name, description, contractPartner, fixReward, varReward, valueTypeId, contractTypeIds, cb) {
    Session.set('waitingForConfirmation', true);
    IndividualContractContract.new(name, description, contractPartner, fixReward, varReward, valueTypeId, contractTypeIds,
        {
            from: web3.eth.accounts[0],
            data: '0x6060604052735e54da5df1526711ee28d9c639890c08e169e4dd600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550346200000057604051620012b5380380620012b5833981016040528080518201919060200180518201919060200180519060200190919080519060200190919080519060200190919080519060200190919080518201919060200150505b8660019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200010157805160ff191683800117855562000132565b8280016001018555821562000132579182015b828111156200013157825182559160200191906001019062000114565b5b5090506200015a91905b80821115620001565760008160009055506001016200013c565b5090565b50508560029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001aa57805160ff1916838001178555620001db565b82800160010185558215620001db579182015b82811115620001da578251825591602001919060010190620001bd565b5b5090506200020391905b80821115620001ff576000816000905550600101620001e5565b5090565b505033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555084600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555083600581905550826006819055506000600960006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055506000600960016101000a81548160ff02191690837f010000000000000000000000000000000000000000000000000000000000000090810204021790555062000328826200063864010000000002620006fd176401000000009004565b6200034781620007f264010000000002620008b1176401000000009004565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f3fa63ad3060016002600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546006548a6008600960009054906101000a900460ff16600960019054906101000a900460ff166040518c7c0100000000000000000000000000000000000000000000000000000000028152600401808c73ffffffffffffffffffffffffffffffffffffffff16815260200180602001806020018b73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1681526020018981526020018881526020018781526020018660048015620004d9576020028201916000905b82829054906101000a900460ff1681526020019060010190602082600001049283019260010382029150808411620004a45790505b50508515158152602001841515815260200183810383528d818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015620005705780601f10620005445761010080835404028352916020019162000570565b820191906000526020600020905b8154815290600101906020018083116200055257829003601f168201915b505083810382528c818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015620005f75780601f10620005cb57610100808354040283529160200191620005f7565b820191906000526020600020905b815481529060010190602001808311620005d957829003601f168201915b50509d5050505050505050505050505050600060405180830381600087803b15620000005760325a03f11562000000575050505b50505050505050620008f7565b600081141562000681576000600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b6001811415620006ca576001600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b600281141562000713576002600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b60038114156200075c576003600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b6004811415620007a5576004600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b6005811415620007ee576005600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b50565b600060006000600092505b60048310156200086857600060088460048110156200000057602091828204019190065b6101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b8280600101935050620007fd565b600091505b8351821015620008f057838281518110156200000057906020019060200201519050600160088260048110156200000057602091828204019190065b6101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b81806001019250506200086d565b5b50505050565b6109af80620009066000396000f3606060405236156100b2576000357c01000000000000000000000000000000000000000000000000000000009004806302d05d3f146100b757806305bbbea3146100f057806306fdde031461011b5780633fe0b523146101965780635051a5ec146101b9578063619d2671146101de5780637284e416146101ed578063800fa5ff14610268578063885ef0ba146102a15780639db9109e146102c4578063e99548a5146102e9578063ef23b8131461031c575b610000565b34610000576100c461032b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576100fd610351565b60405180826005811161000057815260200191505060405180910390f35b3461000057610128610364565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576101a3610402565b6040518082815260200191505060405180910390f35b34610000576101c6610408565b60405180821515815260200191505060405180910390f35b34610000576101eb61041b565b005b34610000576101fa610529565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561025a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576102756105c7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102ae6105ed565b6040518082815260200191505060405180910390f35b34610000576102d16105f3565b60405180821515815260200191505060405180910390f35b34610000576103046004808035906020019091905050610606565b60405180821515815260200191505060405180910390f35b346100005761032961062d565b005b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600760009054906101000a900460ff1681565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103fa5780601f106103cf576101008083540402835291602001916103fa565b820191906000526020600020905b8154815290600101906020018083116103dd57829003601f168201915b505050505081565b60065481565b600960009054906101000a900460ff1681565b6001600960006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055507f377e6f023fbebfa25069d0eebfe9a18486442bf446eb7a8ba2a319d0443c8f3f600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1630604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a15b565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105bf5780601f10610594576101008083540402835291602001916105bf565b820191906000526020600020905b8154815290600101906020018083116105a257829003601f168201915b505050505081565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b600960019054906101000a900460ff1681565b600881600481101561000057602091828204019190065b915054906101000a900460ff1681565b7f35bd287cec5c2d4ec96c59f4d1789ee1fa2b4e43c9375c5e1ad839bbe042232d600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1630604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001935050505060405180910390a15b565b6000811415610745576000600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b600181141561078d576001600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b60028114156107d5576002600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b600381141561081d576003600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b6004811415610865576004600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b60058114156108ad576005600760006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b50565b600060006000600092505b6004831015610924576000600884600481101561000057602091828204019190065b6101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b82806001019350506108bc565b600091505b83518210156109a85783828151811015610000579060200190602002015190506001600882600481101561000057602091828204019190065b6101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b8180600101925050610929565b5b5050505056',
            gas: '4700000'
        }, (error, contract) => {
            Session.set('waitingForConfirmation', false);
            if (error) {
                console.error(error);
                Materialize.toast('You have to accept the transaction', 3000);
            }
            else {
                const createIndividualContractTx = {
                    type: 'Contract',
                    title: 'New contract created',
                    description: 'You created a new contract'
                };
                insertPendingTransaction(contract.transactionHash, createIndividualContractTx);
                if (cb) cb();
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    removePendingTransaction(contract.transactionHash);
                    console.log(contract);
                }
            }
        }
    );
}

export function subscribeToContract(contractAddress) {
    IndividualContractsSubscribedTo[contractAddress] = IndividualContractContract.at(contractAddress);
    console.log(IndividualContractsSubscribedTo[contractAddress]);
    IndividualContractsSubscribedTo[contractAddress].contractPartner((error, result) => {
        console.log(result);
    });
}