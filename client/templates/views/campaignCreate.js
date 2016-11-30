import {Template} from 'meteor/templating';

import './campaignCreate.html';

FlowRouter.route('/campaigns/create', {
    action: function (params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignCreate',
            sidebar: 'layout_sidebar'
        });
    }
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