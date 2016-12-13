import {Template} from 'meteor/templating';

import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

import './campaigns.html';

// Home routes
FlowRouter.route('/campaigns', {
    triggersEnter: [function () {
        getAllCampaignsFromContract();
    }],
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaigns',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_campaigns.onRendered(function () {
    $(document).ready(function () {
        $('ul.tabs').tabs();
    });
});

Template.views_campaigns.events({
    'click .js-start-campaign'(event) {
        FlowRouter.go('/campaigns/create');
    }
});

Template.views_campaigns.helpers({
    campaigns: function () {
        return Campaigns.find().fetch();
    }
});