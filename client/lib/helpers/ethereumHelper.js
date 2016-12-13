import {Session} from 'meteor/session';

import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

export function pendingTransaction (txHash, cb) {
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
                Materialize.toast('Successfully mined transaction!', 3000, 'rounded');
                getAllCampaignsFromContract();
            } else if (!result && counter < maxAttempts) {
                setTimeout(function () {
                    getTx();
                }, 1000);
            } else {
                Materialize.toast('Transaction could not be mined.', 3000, 'rounded');
                console.log('transaction ' + txHash + ' could not be mined after ' + maxAttempts + ' attempts.')
            }
        });
    };
    getTx();
    if (cb) cb();
}