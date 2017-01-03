import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {ReactiveVar} from 'meteor/reactive-var';

import './contractCreate.html';

FlowRouter.route('/contracts/create', {
    action: (params, queryParams) => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contractCreate',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_contractCreate.onCreated(() => {

});

Template.views_contractCreate.onRendered(() => {

});

Template.views_contractCreate.events({

});

Template.views_contractCreate.helpers({
    hiredBid: () => {
        return Session.get('hiredBid');
    }
});