import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './home.html';

// Home routes
FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_home',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_home.onRendered(() => {

});

Template.views_home.helpers({
    user: () => {
        return Users.findOne({userAddress: account});
    }
});

Template.views_home.events({

});