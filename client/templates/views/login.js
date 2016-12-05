import {Template} from 'meteor/templating';
import {Session} from 'meteor/session'

import './login.html';

// Routes
FlowRouter.route('/login', {
    name: 'login',
    triggersEnter: [function () {
        UserRegisterContract.users(account, function (error, result) {
            if (error) {
                console.error('ERROR in checkValidAccount');
            } else if (result[0]) {
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
    roles: ['Author', 'Provider', 'Reader'],
    mining: function () {
        return Session.get('mining');
    }
});

Template.views_login.events({
    'click .js-create'(event) {
        const username = $('#username').val();
        const role = $('#role').val();
        UserRegisterContract.join(username, role, function (error, result) {
            if (error) {
                console.error('ERROR in login.js');
            } else {
                console.log('SUCCESS');
                console.log(result);
                Session.set('mining', true);
            }
        });
    }
});