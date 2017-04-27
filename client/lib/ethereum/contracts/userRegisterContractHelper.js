import {Session} from 'meteor/session';

const abiArray = [{
    "constant": false,
    "inputs": [{"name": "userName", "type": "string"}, {"name": "mailAddress", "type": "string"}],
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
    "outputs": [{"name": "userName", "type": "string"}, {"name": "mailAddress", "type": "string"}],
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

const address = "0x49efe87f47cf7c08563c0c81fa10073af5073f1a";

UserRegisterContract = web3.eth.contract(abiArray).at(address);

export function joinToContract(userName, mailAddress, cb) {
    Session.set('creatingAccount', true);
    UserRegisterContract.join(userName, mailAddress, (error, result) => {
        if (error)
            console.error(error);
        else {
            const maxAttempts = 600;
            let counter = 0;
            console.log('transaction hash: ' + result);
            console.log('waiting for transaction to be mined...');
            const getTx = () => {
                web3.eth.getTransactionReceipt(result, (error, result) => {
                    counter++;
                    if (error) {
                        console.error(error);
                    } else if (result && counter < maxAttempts) {
                        console.log('successfully mined transaction: ' + result);
                        Materialize.toast('Successfully created account!', 3000);
                        if (cb) cb();
                    } else if (!result && counter < maxAttempts) {
                        setTimeout(() => {
                            getTx();
                        }, 1000);
                    } else {
                        console.log('transaction ' + result + ' could not be mined after ' + maxAttempts + ' attempts.');
                        Materialize.toast('Account could not be created...', 3000);
                    }
                });
            };
            getTx();
        }
    });
}

export function getUserNameByAddressFromContract(address) {
    UserRegisterContract.users(address, (error, result) => {
        if (error)
            console.error(error);
        else {
            Users.upsert({userAddress: address}, {userAddress: address, userName: result[0], mailAddress: result[1]});
            return result;
        }
    });
}

UserRegisterContract.JoinSuccess().watch((error, result) => {
    if (error) {
        console.error('userRegisterHelper.js - JoinSuccess event');
    } else {
        console.log('event JoinSuccess fired!');
        console.log(result);
    }
});