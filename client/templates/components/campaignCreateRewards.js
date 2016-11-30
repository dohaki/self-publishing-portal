import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './campaignCreateRewards.html';

const defaultReward = {
    title: '',
    contribution: 0,
    description: '',
    estimatedShipment: '',
    restrictedReward: null
};

Template.components_campaignCreateRewards.onCreated(function () {
    this.rewards = new ReactiveVar([defaultReward]);
});

Template.components_campaignCreateRewards.helpers({
    rewards: function () {
        return Template.instance().rewards.get();
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
        let rewards = Template.instance().rewards.get();
        rewards.push(defaultReward);
        Template.instance().rewards.set(rewards);
    }
});