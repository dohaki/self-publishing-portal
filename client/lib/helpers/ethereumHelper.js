import {Session} from 'meteor/session';

export function pendingTransaction (txHash, cb) {
    const maxAttempts = 60;
    let counter = 0;
    Session.set('mining', true);
    console.log('transaction hash: ' + txHash);
    console.log('waiting for transaction to be mined...');
    let getTx = function () {
        web3.eth.getTransactionReceipt(txHash, function (error, result) {
            counter++;
            if (error) {
                console.error(error);
            } else if (!result && counter < maxAttempts) {
                setTimeout(function () {
                    getTx();
                }, 1000);
            } else if (result) {
                Session.set('mining', false);
                console.log('transaction mined!');
                if (cb) {
                    cb();
                }
            } else {
                Session.set('mining', false);
                console.error('transaction could not be mined.');
            }
        });
    };
    getTx();
}