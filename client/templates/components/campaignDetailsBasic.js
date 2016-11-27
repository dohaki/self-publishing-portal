import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var'

import './campaignDetailsBasic.html';

Template.components_campaignDetailsBasic.onCreated(function () {
   this.duration = new ReactiveVar(30);
});

Template.components_campaignDetailsBasic.helpers({
    duration: function () {
        return Template.instance().duration.get()
    },
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

Template.components_campaignDetailsBasic.events({
});