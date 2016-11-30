import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './rewardCard.html';

Template.components_rewardCard.onCreated(function () {
});

Template.components_rewardCard.onRendered(function () {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});

Template.components_rewardCard.helpers({
    categories: [
        'Science fiction',
        'Satire',
        'Drama',
        'Action and Adventure',
        'Romance',
        'Mystery',
        'Horror',
        'Self help'
    ]
});

Template.components_rewardCard.events({
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'rewards');
    }
});