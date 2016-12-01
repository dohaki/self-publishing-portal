import {Template} from 'meteor/templating';

import './header.html';

Template.layout_header.onRendered(function () {
    $(document).ready(function () {
        $('.button-collapse').sideNav();
    });
});

Template.layout_header.helpers({});

Template.layout_header.events({});