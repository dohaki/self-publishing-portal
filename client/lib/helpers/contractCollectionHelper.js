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
    Contracts.update({contractAddress: contractAddress}, {$set: newContract});
    if (cb) cb();
}