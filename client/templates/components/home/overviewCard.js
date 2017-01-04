import {Template} from 'meteor/templating';

import './overviewCard.html';

Template.components_overviewCard.onCreated(() => {
    // this.newMessages = new ReactiveVar(0);
});

Template.components_overviewCard.onRendered(() => {
});

Template.components_overviewCard.helpers({
    newMessages: () => {
        return 4;
    },
    liveCampaigns: () => {
        return Campaigns.find({beneficiary: account, campaignClosed: false}).count();
    },
    activeInsertions: () => {
        return Insertions.find({owner: account, isActive: true}).count();
    },
    activeContracts: () => {
        return 0;
    }
});