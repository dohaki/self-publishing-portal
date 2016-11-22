import { Template } from 'meteor/templating';

import './login.html';

// Routes
FlowRouter.route('/login', {
    name: 'login',
    action: function () {
        BlazeLayout.render('views_login');
    }
});

Template.views_login.helpers({
    accounts: EthAccounts.find().fetch()
});