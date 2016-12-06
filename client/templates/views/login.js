import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import './login.html';

// Routes
FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [function () {
        UserRegisterContract.users(account, function (error, result) {
            if (error) {
                console.error('login.js - triggersEnter');
            } else if (result) {
                FlowRouter.go('/');
            }
        });
    }],
    action: function () {
        BlazeLayout.render('views_login');
    }
});

Template.views_login.onCreated(function () {
    Session.set('mining', false);
});

Template.views_login.onRendered(function () {
    $(document).ready(function () {
        $('select').material_select();
    });
});

Template.views_login.helpers({
    mining: function () {
        return Session.get('mining');
    }
});

Template.views_login.events({
    'click .js-create'(event) {
        const username = $('#username').val();
        UserRegisterContract.join(username, function (error, result) {
            if (error) {
                console.error('login.js - click .js-create - ' + error);
            } else {
                console.log('creating user on blockchain...');
                console.log('transaction# ' + result);
                EthereumHelper.pendingTransaction(result, function () {
                   FlowRouter.go('/');
                });
            }
        });
    }
});