import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './insertions.html';

// Home routes
FlowRouter.route('/insertions', {
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertions',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_insertions.onCreated(() => {

});

Template.views_insertions.onRendered(() => {
    $('ul.tabs').tabs();
});

Template.views_insertions.events({
    'click .js-create-insertion'(event) {
        FlowRouter.go('/insertions/create');
    },
});

Template.views_insertions.helpers({

});