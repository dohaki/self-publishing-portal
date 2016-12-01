import { Template } from 'meteor/templating';

import './login.html';

// Routes
FlowRouter.route('/login', {
    name: 'login',
    action: function () {
        BlazeLayout.render('views_login');
    }
});

Template.views_login.onRendered(function () {
    $(document).ready(function() {
        $('select').material_select();
    });
});

Template.views_login.helpers({
    roles: ['Author', 'Provider', 'Reader']
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
                // TODO username und role in lokaler DB oder Session speichern
            }
        });
    }
});