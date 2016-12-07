const abiArray = [{
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "campaigns",
    "outputs": [{"name": "_id", "type": "uint256"}, {"name": "title", "type": "string"}, {
        "name": "description",
        "type": "string"
    }, {"name": "category", "type": "string"}, {"name": "beneficiary", "type": "address"}, {
        "name": "fundingGoal",
        "type": "uint256"
    }, {"name": "amountRaised", "type": "uint256"}, {
        "name": "deadline",
        "type": "uint256"
    }, {"name": "fundingGoalReached", "type": "bool"}, {
        "name": "campaignClosed",
        "type": "bool"
    }, {"name": "numOfBackers", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "checkGoalReached",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "safeWithdrawal",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "title", "type": "string"}, {"name": "description", "type": "string"}, {
        "name": "category",
        "type": "string"
    }, {"name": "fundingGoal", "type": "uint256"}, {"name": "duration", "type": "uint256"}],
    "name": "startCampaign",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "campaignIds",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "contribute",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "campaignCounter",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {"inputs": [], "payable": false, "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "beneficiary", "type": "address"}, {
        "indexed": false,
        "name": "_id",
        "type": "uint256"
    }],
    "name": "CampaignStarted",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "beneficiary", "type": "address"}, {
        "indexed": false,
        "name": "amountRaised",
        "type": "uint256"
    }, {"indexed": false, "name": "_id", "type": "uint256"}],
    "name": "GoalReached",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "backer", "type": "address"}, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }, {"indexed": false, "name": "isContribution", "type": "bool"}, {
        "indexed": false,
        "name": "_id",
        "type": "uint256"
    }],
    "name": "FundTransfer",
    "type": "event"
}];

const address = "0x37e35ca76907bfc0c37595e74189bc22ed99f3a5";

CrowdFundingContract = web3.eth.contract(abiArray).at(address);

/**
 * Initiale GET-Methode um alle Kampagnen auf der Blockchain zu holen
 */
CrowdFundingContract.campaignCounter(function (error, result) {
    if (error) console.error(error);
    else {
        const counter = result.c[0];
        for (let i = 1; i <= counter; i++) {
            CrowdFundingContract.campaigns(i, function (error, result) {
                Campaigns.upsert({_id: result[0].c[0]}, {
                    _id: result[0].c[0],
                    title: result[1],
                    description: result[2],
                    category: result[3],
                    beneficiary: result[4],
                    fundingGoal: result[5].c[0],
                    amountRaised: result[6].c[0],
                    deadline: new Date(result[7].c[0] * 1000),
                    fundingGoalReached: result[8],
                    campaignClosed: result[9],
                    numOfBackers: result[10].c[0]
                });
            });
        }
    }
});

CrowdFundingContract.CampaignStarted().watch(function (error, result) {
    if (error) {
        console.error('CampaignStarted event');
        console.error(error);
    } else {
        console.log('event CampaignStarted fired!');
        console.log(result);
    }
});