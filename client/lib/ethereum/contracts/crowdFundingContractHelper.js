import {Session} from 'meteor/session';

import {
    upsertCampaign,
    updateCampaign,
    getCategory
} from '/client/lib/helpers/campaignCollectionHelper';
import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';

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
    }, {"name": "numOfContributions", "type": "uint256"}, {"name": "createdAt", "type": "uint256"}],
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
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
    "name": "contributions",
    "outputs": [{"name": "contributor", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "title", "type": "string"}, {"name": "description", "type": "string"}, {
        "name": "category",
        "type": "string"
    }, {"name": "fundingGoal", "type": "uint256"}, {"name": "duration", "type": "uint256"}, {
        "name": "html",
        "type": "string"
    }],
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
    "payable": true,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "campaignHtml",
    "outputs": [{"name": "", "type": "string"}],
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

const address = "0xb5e88430c67b1d3598560a64208d94b217d084ac";

CrowdFundingContract = web3.eth.contract(abiArray).at(address);

export function getContributionsFromContract(campaignId, contributionId) {
    CrowdFundingContract.contributions(campaignId, contributionId, function (error, result) {
        if (error) console.error(error);
        else {
            let contribution = {
                contributor: result[0],
                amount: new BigNumber(result[1]).toNumber()
            };
            let changes = {$push: {contributions: contribution}};
            updateCampaign(campaignId, changes);
        }
    });
}

/**
 * Holt von der Blockchain über den index die zugehörige Kampagne
 * und aktualisiert diese in der lokalen DB
 * @param index
 */
export function getCampaignFromContract(index) {
    CrowdFundingContract.campaigns(index, function (error, result) {
        if (error) console.error(error);
        else {
            let campaign = {
                _id: new BigNumber(result[0]).toNumber(),
                title: result[1],
                description: result[2],
                category: getCategory(result[3]),
                subCategory: result[3],
                beneficiary: result[4],
                fundingGoal: new BigNumber(result[5]).toNumber(),
                amountRaised: new BigNumber(result[6]).toNumber(),
                deadline: new Date(new BigNumber(result[7]).toNumber() * 1000),
                fundingGoalReached: result[8],
                campaignClosed: result[9],
                numOfContributions: new BigNumber(result[10]).toNumber(),
                createdAt: new Date(new BigNumber(result[11]).toNumber() * 1000),
                status: 'MINED'
            };
            const existingCampaign = Campaigns.findOne({_id: campaign._id});
            if (!existingCampaign || !existingCampaign.contributions) campaign.contributions = [];
            else {
                campaign.contributions = existingCampaign.contributions;
                campaign.html = existingCampaign.html;
                campaign.archive = existingCampaign.archive;
                if (campaign.campaignClosed) campaign.contributions = [];
            }
            upsertCampaign(campaign._id, campaign, function () {
                if (!existingCampaign) {
                    CrowdFundingContract.campaignHtml(index, function (error, result) {
                        if (error) console.error(error);
                        else {
                            updateCampaign(index, {$set: {html: result}}, function () {
                                for (let i = 0; i < campaign.numOfContributions; i++) {
                                    getContributionsFromContract(index, i);
                                }
                            });
                        }
                    });
                } else if (!campaign.campaignClosed) {
                    for (let i = existingCampaign.contributions.length; i < campaign.numOfContributions; i++) {
                        getContributionsFromContract(index, i);
                    }
                } else {
                    for (let i = 0; i < campaign.numOfContributions; i++) {
                        getContributionsFromContract(index, i);
                    }
                }
            });
        }
    });
}

/**
 * GET-Methode um alle Kampagnen auf der Blockchain zu holen
 */
export function getAllCampaignsFromContract() {
    CrowdFundingContract.campaignCounter(function (error, result) {
        if (error) console.error(error);
        else {
            const counter = new BigNumber(result).toNumber();
            for (let i = 1; i <= counter; i++) {
                getCampaignFromContract(i);
            }
        }
    });
}

export function startCampaign(title, description, category, goal, duration, html, cb) {
    Session.set('waitingForConfirmation', true);
    CrowdFundingContract.startCampaign(title, description, category, goal, duration, html, function (error, result) {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            const startCampaignTx = {
                type: 'Campaigns',
                title: 'New campaign started',
                description: 'You started a new campaign with the title: ' + title
            };
            pendingTransaction(result, startCampaignTx, () => {
                if (cb) cb();
            });
        }
    });
}

export function contributeToContract(campaignId, amount, cb) {
    Session.set('waitingForConfirmation', true);
    CrowdFundingContract.contribute(campaignId, {value: web3.toWei(amount, 'ether')}, function (error, result) {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            const contributeToCampaignTx = {
                type: 'Campaigns',
                title: 'Contribution',
                description: 'You contributed ' + amount + ' ETH'
            };
            pendingTransaction(result, contributeToCampaignTx, () => {
                if (cb) cb();
            });
        }
    });
}

export function checkGoalReached(campaignId, cb) {
    Session.set('waitingForConfirmation', true);
    CrowdFundingContract.checkGoalReached(campaignId, function (error, result) {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            const checkGoalReachedTx = {
                type: 'Campaigns',
                title: 'Check goal reached',
                description: 'You checked if funding goal is reached.'
            };
            pendingTransaction(result, checkGoalReachedTx, () => {
                if (cb) cb();
            });
        }
    });
}

export function safeWithdrawal(campaignId, fundsOrContribution, cb) {
    Session.set('waitingForConfirmation', true);
    CrowdFundingContract.safeWithdrawal(campaignId, function (error, result) {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            let safeWithdrawalTx;
            if (fundsOrContribution === 'CONTRIBUTION') {
                safeWithdrawalTx = {
                    type: 'Campaigns',
                    title: 'Get contributions back',
                    description: 'You requested to get your contributions back.'
                };
            } else {
                safeWithdrawalTx = {
                    type: 'Campaigns',
                    title: 'Get funds',
                    description: 'You requested to release your raised funds.'
                };
            }
            Campaigns.update({_id: id}, {$set: {fundsReleased: true}});
            pendingTransaction(result, safeWithdrawalTx, () => {
                if (cb) cb();
            });
        }
    });
}

/**
 * Sobald eine neue Kampagne erstellt wurde, füge diese auch in der lokalen DB ein
 */
CrowdFundingContract.CampaignStarted().watch(function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('event CampaignStarted fired!');
        console.log(result);
        getCampaignFromContract(new BigNumber(result.args._id));
    }
});

/**
 * Sobald eine neue Kampagne erstellt wurde, füge diese auch in der lokalen DB ein
 */
CrowdFundingContract.FundTransfer().watch(function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('event FundTransfer fired!');
        console.log(result);
        getCampaignFromContract(new BigNumber(result.args._id));
    }
});

/**
 * Sobald eine neue Kampagne erstellt wurde, füge diese auch in der lokalen DB ein
 */
CrowdFundingContract.GoalReached().watch(function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('event GoalReached fired!');
        console.log(result);
        getCampaignFromContract(new BigNumber(result.args._id));
    }
});