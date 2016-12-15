import {Session} from 'meteor/session';

import {insertPendingTransaction, removePendingTransaction, failedTransaction} from '/client/lib/helpers/transactionCollectionHelper';
import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

export function pendingTransaction (txHash, txData, cb) {
    insertPendingTransaction(txHash, txData);
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
                removePendingTransaction(txHash);
                if (txData.type === 'Campaigns') getAllCampaignsFromContract();
            } else if (!result && counter < maxAttempts) {
                setTimeout(function () {
                    getTx();
                }, 1000);
            } else {
                console.log('transaction ' + txHash + ' could not be mined after ' + maxAttempts + ' attempts.');
                failedTransaction(txHash);
            }
        });
    };
    getTx();
    if (cb) cb();
}