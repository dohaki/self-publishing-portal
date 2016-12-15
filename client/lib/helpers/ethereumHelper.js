import {Session} from 'meteor/session';

export function pendingTransaction (txHash, get, cb) {
    const maxAttempts = 600;
    let counter = 0;
    console.log('transaction hash: ' + txHash);
    console.log('waiting for transaction to be mined...');
    let getTx = function () {
        web3.eth.getTransactionReceipt(txHash, function (error, result) {
            counter++;
            if (error) {
                console.error(error);
            } else if (result && counter < maxAttempts) {
                console.log('successfully mined transaction: ' + txHash);
                if (get) get();
            } else if (!result && counter < maxAttempts) {
                setTimeout(function () {
                    getTx();
                }, 1000);
            } else {
                console.log('transaction ' + txHash + ' could not be mined after ' + maxAttempts + ' attempts.')
            }
        });
    };
    getTx();
    if (cb) cb();
}