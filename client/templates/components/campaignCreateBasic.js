import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var'

import './campaignCreateBasic.html';

Template.components_campaignCreateBasic.onCreated(function () {
   this.duration = new ReactiveVar(30);
});

Template.components_campaignCreateBasic.helpers({
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

Template.components_campaignCreateBasic.events({
});