import {Session} from 'meteor/session';

EthereumHelper = {
    pendingTransaction: function (txHash, cb) {
        Session.set('mining', true);
        let getTx = function () {
            web3.eth.getTransaction(txHash, function (error, result) {
                if (error) {
                    console.error(error);
                } else if (!result.transactionIndex) {
                    getTx();
                } else {
                    Session.set('mining', false);
                    if (cb) {
                        cb();
                    }
                }
            });
        };
        getTx();
    }
};