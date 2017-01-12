export function insertNewContract(contract, cb) {
    const foundContract = Contracts.findOne({ contractAddress: contract.contractAddress });
    if (!foundContract) {
        Contracts.insert(contract);
        if (cb) cb();
    }
}