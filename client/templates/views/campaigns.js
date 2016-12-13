import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';
import {campaignCategories} from '/client/lib/helpers/campaignCollectionHelper';

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

Template.views_campaigns.onCreated(function () {
    this.categories = new ReactiveVar(campaignCategories);
    this.selectedCategories = new ReactiveVar([]);
});

Template.views_campaigns.onRendered(function () {
    $(document).ready(function () {
        $('ul.tabs').tabs();
        $('.carousel').carousel({
            dist: 0,
            indicators: true
        });
    });
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
    myCampaigns: function () {
        return Campaigns.find({beneficiary: account}).fetch();
    },
    mostPopularCampaigns: function () {
        return Campaigns.find({}, {sort: {numOfContributions: -1}}).fetch();
    },
    mostRecentCampaigns: function () {
        return Campaigns.find({}, {sort: {createdAt: -1}}).fetch();
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