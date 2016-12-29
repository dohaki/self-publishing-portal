import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';
import {campaignCategories} from '/client/lib/helpers/campaignCollectionHelper';

import './campaigns.html';

// Home routes
FlowRouter.route('/campaigns', {
    name: 'campaigns',
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

Template.views_campaigns.onCreated(function () {
    this.categories = new ReactiveVar(campaignCategories);
    this.selectedCategories = new ReactiveVar([]);
});

Template.views_campaigns.onRendered(function () {
    $('ul.tabs').tabs();
});

Template.views_campaigns.events({
    'click .js-start-campaign'(event) {
        FlowRouter.go('/campaigns/create');
    },
    'click .js-select-category'(event) {
        const category = event.target.text;
        let selectedCategories = Template.instance().selectedCategories.get();
        if (selectedCategories.indexOf(category) !== -1) return;
        else selectedCategories.push(event.target.text);
        Template.instance().selectedCategories.set(selectedCategories);
    },
    'click .js-remove-category'(event) {
        const category = event.target.parentElement.id;
        let selectedCategories = Template.instance().selectedCategories.get();
        selectedCategories.splice(selectedCategories.indexOf(category), 1);
        Template.instance().selectedCategories.set(selectedCategories);
    }
});

Template.views_campaigns.helpers({
    pendingTransactions: function () {
        return Transactions.find({status: 'PENDING', type: 'Campaigns'}).fetch();
    },
    myLiveCampaigns: function () {
        return Campaigns.find({
            beneficiary: account,
            status: 'MINED',
            archive: false
        }, {sort: {createdAt: -1}}).fetch();
    },
    contributedCampaigns: function () {
        return Campaigns.find({
            archive: false,
            contributions: {
                $elemMatch: {
                    contributor: account
                }
            }
        }).fetch();
    },
    mostPopularCampaigns: function () {
        return Campaigns.find({campaignClosed: false}, {sort: {numOfContributions: -1}}).fetch();
    },
    mostRecentCampaigns: function () {
        return Campaigns.find({campaignClosed: false}, {sort: {createdAt: -1}}).fetch();
    },
    categories: function () {
        return Template.instance().categories.get();
    },
    selectedCategories: function () {
        return Template.instance().selectedCategories.get();
    },
    getFilteredCampaigns: function (category) {
        return Campaigns.find({category: category}, {sort: {createdAt: -1}}).fetch();
    }
});