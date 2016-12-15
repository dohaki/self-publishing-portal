export function insertPendingTransaction (txHash, txData) {
    Transactions.insert({
        txHash: txHash,
        title: txData.title,
        description: txData.description,
        createdAt: Date.now(),
        status: 'PENDING'
    });
}

export function removePendingTransaction (txHash) {
    Transactions.remove({txHash: txHash});
}

export function failedTransaction (txHash) {
    Transactions.update({txHash: txHash}, {$set: {status: 'FAILED'}});
}