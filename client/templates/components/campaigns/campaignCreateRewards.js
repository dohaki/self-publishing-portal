import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './campaignCreateRewards.html';

const defaultReward = {
    title: '',
    contribution: 0,
    description: '',
    estimatedShipment: '',
    restrictedReward: null
};

Template.components_campaignCreateRewards.onCreated(function () {
    Session.setDefault('rewards', [defaultReward]);
});

Template.components_campaignCreateRewards.helpers({
    rewards: function () {
        return Session.get('rewards');
    }
});

Template.components_campaignCreateRewards.events({
    // geht ein Tab weiter nach rechts
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'background');
    },
    // geht ein Tab weiter nach links
    'click .js-back'() {
        $('ul.tabs').tabs('select_tab', 'basic');
    },
    // fügt eine neue leere Belohnung hinzu
    'click .js-add-reward'() {
        let rewards = Session.get('rewards');
        rewards.push(defaultReward);
        Session.set('rewards', rewards);
    }
});