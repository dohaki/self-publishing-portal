import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import './messages.html';

// Routes
FlowRouter.route('/messages', {
    name: 'messages',
    triggersEnter: [function () {
    }],
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_messages',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_messages.onCreated(function () {
});

Template.views_messages.onRendered(function () {
});

Template.views_messages.helpers({

});

Template.views_messages.events({
    'click .js-create'(event) {
    }
});