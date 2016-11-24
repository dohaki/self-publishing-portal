import { Template } from 'meteor/templating';

import './campaigns.html';

// Home routes
FlowRouter.route('/campaigns', {

    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaigns',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_campaigns.onRendered(function () {
    $(document).ready(function(){
        $('.carousel').carousel({
            dist: 0,
            indicators: true
        });
    });
});

Template.views_campaigns.helpers({
   campaigns: [{
       name: 'campaign 1',
       deadline: '28.11.2016',
       description: 'blablablabla.',
       goal: '1000',
       reached: '600',
       backers: [{
           name: 'backer 1',
           contributed: '100'
       }, {
           name: 'backer 2',
           contributed: '50'
       }, {
           name: 'backer 3',
           contributed: '450'
       }]
   }, {
       name: 'campaign 2',
       deadline: '28.11.2016',
       description: 'blablablabla.',
       goal: '1000',
       reached: '600',
       backers: [{
           name: 'backer 1',
           contributed: '100'
       }, {
           name: 'backer 2',
           contributed: '50'
       }, {
           name: 'backer 3',
           contributed: '450'
       }]
   }, {
       name: 'campaign 3',
       deadline: '28.11.2016',
       description: 'blablablabla.',
       goal: '1000',
       reached: '600',
       backers: [{
           name: 'backer 1',
           contributed: '100'
       }, {
           name: 'backer 2',
           contributed: '50'
       }, {
           name: 'backer 3',
           contributed: '450'
       }]
   }]
});