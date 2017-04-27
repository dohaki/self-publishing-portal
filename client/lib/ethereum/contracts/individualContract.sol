pragma solidity ^0.4.2;

contract Contract {

    string public name;
    string public description;
    address public creator;
    address public contractPartner;
    uint public reward;
    ValueType public valueType;
    ContractType[] public contractTypes;
    bool public isAccepted;
    bool public isFullfilled;

    event ContractCreated(address creator, address partner, address contractAddress);
    event ContractAccepted(address creator, address partner, address contractAddress);
    event ContractDeclined(address creator, address partner, address contractAddress);

    // FixedPrice == 1, HourlyRate == 2, Royalty == 3, ValueRate == 4, ...
    enum ContractType {FixedPrice, HourlyRate, Royalty, ValueRate}
    // None == 0, Piece == 1, ...
    enum ValueType {None, Piece, FacebookLikes, FacebookShares, FacebookComments}

    modifier permitted {
        if (msg.sender != creator || msg.sender != contractPartner)
            throw;
        _;
    }

    function Contract(string name, string description, address contractPartner, uint reward, uint valueTypeId, uint[] contractTypeIds) {
        name = name;
        description = description;
        creator = msg.sender;
        contractPartner = contractPartner;
        isAccepted = false;
        isFullfilled = false;
        setValueType(valueTypeId);
        setContractTypes(contractTypeIds); // e.g. types == [1,2]
        ContractCreated(msg.sender, contractPartner, this);
    }

    function setValueType(uint valueTypeId) internal {
        if (valueTypeId == 0) { valueType = ValueType.None; }
        if (valueTypeId == 1) { valueType = ValueType.Piece; }
        if (valueTypeId == 2) { valueType = ValueType.FacebookLikes; }
        if (valueTypeId == 3) { valueType = ValueType.FacebookShares; }
        if (valueTypeId == 4) { valueType = ValueType.FacebookComments; }
    }

    function setContractTypes(uint[] contractTypeIds) internal {
        delete contractTypes;
        for (uint i = 0; i < contractTypeIds.length; i++) {
            uint typeId = contractTypeIds[i];
            if (typeId == 1) { contractTypes.push(ContractType.FixedPrice); }
            if (typeId == 2) { contractTypes.push(ContractType.HourlyRate); }
            if (typeId == 3) { contractTypes.push(ContractType.Royalty); }
        }
    }

    function acceptContract() public permitted {
        isAccepted = true;
        ContractAccepted(creator, contractPartner, this);
    }

    function declineContract() public permitted {
        ContractDeclined(creator, contractPartner, this);
    }

}