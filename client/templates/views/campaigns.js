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

Template.views_campaigns.events({
    'click .js-start-campaign'(event) {
        FlowRouter.go('/campaigns/create');
    }
});

Template.views_campaigns.helpers({
   campaigns: [{
       _id: '123456789',
       name: 'campaign 1',
       author: 'Author author',
       deadline: '2016-11-28',
       description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
       }],
       picture: 'alaska.jpg'
   }, {
       _id: '23456789',
       name: 'campaign 2',
       author: 'campaign 2',
       deadline: '2016-12-28',
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
       }],
       picture: 'book.png'
   }, {
       _id: '3456789',
       name: 'campaign 3',
       author: 'campaign 3',
       deadline: '2016-12-01',
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
       }],
       picture: 'ufo.jpg'
   }]
});