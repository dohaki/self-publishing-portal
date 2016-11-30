import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './campaignCreateBasic.html';

Template.components_campaignCreateBasic.onCreated(function () {
});

Template.components_campaignCreateBasic.helpers({
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

Template.components_campaignCreateBasic.events({
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'rewards');
    }
});