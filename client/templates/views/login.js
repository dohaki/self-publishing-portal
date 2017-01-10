import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import {joinToContract} from '/client/lib/ethereum/contracts/userRegisterContractHelper';

import './login.html';

// Routes
FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [() => {
        UserRegisterContract.users(account, (error, result) => {
            if (error) {
                console.error('login.js - triggersEnter');
            } else if (result[0] !== '' && result[1] !== '') {
                FlowRouter.go('/');
            }
        });
    }],
    action: () => {
        BlazeLayout.render('views_login');
    }
});

Template.views_login.onCreated(() => {
    Session.set('creatingAccount', false);
});

Template.views_login.onRendered(() => {
});

Template.views_login.helpers({
    creatingAccount: () => {
        return Session.get('creatingAccount');
    }
});

Template.views_login.events({
    'click .js-create'(event) {
        const username = $('#username').val();
        const mailAddress = $('#email').val();
        joinToContract(username, mailAddress, () => {
            Session.set('creatingAccount', false);
            FlowRouter.go('/');
        });
    }
});