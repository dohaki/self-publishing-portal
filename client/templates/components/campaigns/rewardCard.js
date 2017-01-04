import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import './rewardCard.html';

Template.components_rewardCard.onCreated(function () {
});

Template.components_rewardCard.onRendered(function () {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});

Template.components_rewardCard.helpers({});

Template.components_rewardCard.events({
    // entfernt eine Belohnung
    'click .js-remove-reward'() {
        let rewards = Session.get('rewards');
        let removeReward = this;
        let index = rewards.findIndex(function (reward) {
            return (reward.title === removeReward.title)
                && (reward.description === removeReward.description)
                && (reward.contribution === removeReward.contribution)
                && (reward.estimatedShipment === removeReward.estimatedShipment)
                && (reward.restrictedReward === removeReward.restrictedReward)
        });
        rewards.splice(index, 1);
        Session.set('rewards', rewards);
    }
});