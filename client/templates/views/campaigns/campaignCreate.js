import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './campaignCreate.html';

Template.views_campaignCreate.onCreated(function () {
    Session.set('isFormValid', false);
});

Template.views_campaignCreate.onRendered(function () {
    $(document).ready(function () {
        $('select').material_select();
        $('ul.tabs').tabs();
    });
});

Template.views_campaignCreate.events({
    'click .tab'(event) {
    }
});