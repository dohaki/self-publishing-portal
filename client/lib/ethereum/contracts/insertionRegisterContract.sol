pragma solidity ^0.4.2;

contract InsertionRegister {

    struct Insertion {
        uint _id;
        string title;
        string description;
        address owner;
        string skills;
        bool isProject;
        uint hourlyRate;
        uint budget;
        uint numOfBids;
        bool isActive;
    }

    struct Bid {
        address bidder;
        uint amount;
    }

    uint public insertionCounter;
    uint [] public insertionIds;

    mapping(uint => Insertion) public insertions;
    mapping(uint => Bid[]) public bids;

    event InsertionPublished(address owner, uint _id);
    event BidToProject(address bidder, uint _id);
    event InsertionDeactivated(uint _id);

    function InsertionRegister() {
        insertionCounter = 0;
    }

    function publishInsertion(string title, string description, string skills, bool isProject, uint hourlyRate, uint budget) {
        insertionCounter++;
        insertions[insertionCounter] = Insertion({
            _id: insertionCounter,
            title: title,
            description: description,
            owner: msg.sender,
            skills: skills,
            isProject: isProject,
            hourlyRate: hourlyRate,
            budget: budget,
            numOfBids: 0,
            isActive: true
        });
        InsertionPublished(msg.sender, insertionCounter);
        insertionIds.push(insertionCounter);
    }

    function bidToProject(uint _id, uint amount) {
        bids[_id].push(Bid(msg.sender, amount));
        insertions[_id].numOfBids++;
        BidToProject(msg.sender, _id);
    }

    function deactivateInsertion(uint _id) {
        insertions[_id].isActive = false;
        InsertionDeactivated(_id);
    }

}