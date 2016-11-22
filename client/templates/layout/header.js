import { Template } from 'meteor/templating';

import './header.html';

Template.layout_header.helpers({

});

Template.layout_header.events({
    'click .button-collapse'(event) {
        // Initialize collapse button
        $('.button-collapse').sideNav();
    }
});