import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {contributeToContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

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
    }
});

Template.views_campaignDetails.events({
    'click .js-contribute' () {
        let amount = $('#contribution').val();
        let id = parseInt(Session.get('campaignId'));
        contributeToContract(id, amount, function () {
           console.log('***');
        });
    }
});