import {Session} from 'meteor/session';

EthereumHelper = {
    pendingTransaction: function (txHash, cb) {
        Session.set('mining', true);
        console.log('transaction hash: ' + txHash);
        console.log('waiting for transaction to be mined...');
        let getTx = function () {
            web3.eth.getTransactionReceipt(txHash, function (error, result) {
                if (error) {
                    console.error(error);
                } else if (!result) {
                    setTimeout(function () {
                        getTx();
                    }, 1000);
                } else {
                    Session.set('mining', false);
                    console.log('transaction mined!');
                    if (cb) {
                        cb();
                    }
                }
            });
        };
        getTx();
    }
};