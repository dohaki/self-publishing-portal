import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import {joinToContract} from '/client/lib/ethereum/contracts/userRegisterContractHelper';

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
    Session.set('creatingAccount', false);
});

Template.views_login.onRendered(function () {
});

Template.views_login.helpers({
    creatingAccount: function () {
        return Session.get('creatingAccount');
    }
});

Template.views_login.events({
    'click .js-create'(event) {
        const username = $('#username').val();
        joinToContract(username, () => {
            Session.set('creatingAccount', false);
            FlowRouter.go('/');
        });
    }
});