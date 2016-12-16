import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {contributeToContract, checkGoalReached, safeWithdrawal} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

import './campaignDetails.html';

FlowRouter.route('/campaigns/:id', {
    action: function (params, queryParams) {
        Session.set('campaignId', params.id)
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignDetails',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_campaignDetails.onRendered(function () {
    $(document).ready(function () {
        $('select').material_select();
        $('ul.tabs').tabs();
        $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '10%', // Starting top style attribute
            ending_top: '20%', // Ending top style attribute
            ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            },
            complete: function () { // Callback for Modal close
            }
        });
    });
});

Template.views_campaignDetails.helpers({
    campaign: function () {
        let id = parseInt(Session.get('campaignId'));
        return Campaigns.findOne({_id: id});
    },
    maxContribution: function () {
        return EthAccounts.find().fetch()[0].balance;
    },
    afterDeadline: function (campaign) {
        return Date.now() >= new Date(campaign.deadline);
    },
    isBeneficiary: (campaign) => {
        return campaign.beneficiary === account;
    },
    isContributor: (campaign) => {
        let contributions = campaign.contributions.map((contribution) => {
            return contribution.contributor;
        });
        return (contributions.indexOf(account) !== -1);
    },
    myContribution: (campaign) => {
        let totalContribution = 0;
        campaign.contributions.map((contribution) => {
            if (contribution.contributor === account) {
                totalContribution += contribution.amount;
            }
        });
        return web3.fromWei(totalContribution, 'ether');
    }
});

Template.views_campaignDetails.events({
    'click .js-contribute' () {
        const amount = $('#contribution').val();
        const id = parseInt(Session.get('campaignId'));
        contributeToContract(id, amount, () => {
           Materialize.toast('Thank you for your contribution!', 3000);
           FlowRouter.go('/campaigns');
        });
    },
    'click .js-check-goal-reached' () {
        const id = parseInt(Session.get('campaignId'));
        checkGoalReached(id, () => {
            Materialize.toast('Checking if goal reached...', 3000);
            FlowRouter.go('/campaigns');
        });
    },
    'click .js-archive' () {
        const id = parseInt(Session.get('campaignId'));
        Campaigns.update({_id: id}, {$set: {archive: true}});
        Materialize.toast('Campaign archived.', 3000);
        FlowRouter.go('/campaigns');
    },
    'click .js-safe-withdrawal' () {
        const id = parseInt(Session.get('campaignId'));
        const campaign = Campaigns.findOne({_id: id});
        let totalContribution = 0;
        campaign.contributions.map((contribution) => {
            if (contribution.contributor === account) {
                totalContribution += contribution.amount;
            }
        });
        if (totalContribution === 0) {
            Materialize.toast('You already got your contribution back', 3000);
        } else {
            safeWithdrawal(id, () => {
                Materialize.toast('Get contribution back', 3000);
                FlowRouter.go('/campaigns');
            });
        }
    }
});