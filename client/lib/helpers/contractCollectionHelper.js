/**
 * Wrapper-Funktion: Führt Callback cb nur aus, falls blockNumber größer als die
 * gespeicherte Blocknummer ist.
 * @param contractAddress
 * @param blockNumber
 * @param cb
 */
export function checkBlockNumber(contractAddress, blockNumber, cb) {
    const oldBlockNumber = Contracts.findOne({contractAddress}).blockNumber;
    if (blockNumber >= oldBlockNumber) cb();
}

/**
 * Fügt ein Contract in die lokale DB, falls es noch keinen Contract mit derselben Adresse gibt
 * @param contract
 * @param cb
 */
export function insertNewContract(contract, cb) {
    const foundContract = Contracts.findOne({ contractAddress: contract.contractAddress });
    if (!foundContract) {
        Contracts.insert(contract);
        if (cb) cb();
    }
}

export function updateContract(contractAddress, newContract, cb) {
    Contracts.update({contractAddress}, {$set: newContract});
    if (cb) cb();
}