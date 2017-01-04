pragma solidity ^0.4.2;

contract Crowdfunding {

    uint campaignCounter;

    struct Campaign {
        uint _id;
        string title;
        string description;
        string category;
        address beneficiary;
        uint fundingGoal;
        uint amountRaised;
        uint deadline;
        mapping(address => uint) balanceOf;
        bool fundingGoalReached;
        bool campaignClosed;
        uint numOfBackers;
    }

    mapping(uint => Campaign) public campaigns;

    event CampaignStarted(address beneficiary, uint _id);
    event GoalReached(address beneficiary, uint amountRaised, uint _id);
    event FundTransfer(address backer, uint amount, bool isContribution, uint _id);

    /*  at initialization, setup the counter */
    function Crowdfunding() {
        campaignCounter = 1;
    }

    function startCampaign(string title, string description, string category, uint fundingGoal, uint duration) {
        campaigns[campaignCounter] = Campaign({
            _id: campaignCounter,
            title: title,
            description: description,
            category: category,
            beneficiary: msg.sender,
            fundingGoal: fundingGoal,
            amountRaised: 0,
            deadline: now + duration * 1 minutes,
            fundingGoalReached: false,
            campaignClosed: false,
            numOfBackers: 0
            });
        CampaignStarted(msg.sender, campaignCounter);
        campaignCounter++;
    }

    function contribute(uint _id) {
        campaigns[_id].amountRaised += msg.value;
        if (campaigns[_id].balanceOf[msg.sender] > 0) {
            campaigns[_id].balanceOf[msg.sender] += msg.value;
        } else {
            campaigns[_id].balanceOf[msg.sender] = msg.value;
            campaigns[_id].numOfBackers++;
        }
        FundTransfer(msg.sender, msg.value, true, _id);
    }

    modifier afterDeadline(uint deadline) { if (now >= deadline) _; }

    /* checks if the goal or time limit has been reached and ends the campaign */
    function checkGoalReached(uint _id) afterDeadline(campaigns[_id].deadline) {
        if (campaigns[_id].amountRaised >= campaigns[_id].fundingGoal) {
            campaigns[_id].fundingGoalReached = true;
            GoalReached(campaigns[_id].beneficiary, campaigns[_id].amountRaised, _id);
        }
        campaigns[_id].campaignClosed = true;
    }


    function safeWithdrawal(uint _id) afterDeadline(campaigns[_id].deadline) {
        if (!campaigns[_id].fundingGoalReached) {
            uint amount = campaigns[_id].balanceOf[msg.sender];
            campaigns[_id].balanceOf[msg.sender] = 0;
            if (amount > 0) {
                if (msg.sender.send(amount)) {
                    FundTransfer(msg.sender, amount, false, _id);
                } else {
                    campaigns[_id].balanceOf[msg.sender] = amount;
                }
            }
        }

        if (campaigns[_id].fundingGoalReached && campaigns[_id].beneficiary == msg.sender) {
            if (campaigns[_id].beneficiary.send(campaigns[_id].amountRaised)) {
                FundTransfer(campaigns[_id].beneficiary, campaigns[_id].amountRaised, false, _id);
            } else {
                //If we fail to send the funds to beneficiary, unlock funders balance
                campaigns[_id].fundingGoalReached = false;
            }
        }
    }
}