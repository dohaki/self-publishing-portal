import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import './campaignDetails.html';

FlowRouter.route('/campaigns/:id', {
    action: function (params, queryParams) {
        Session.set('campaignId', params.id)
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignDetails',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_campaignDetails.onRendered(function () {
    $(document).ready(function () {
        $('select').material_select();
        $('ul.tabs').tabs();
    });
});

Template.views_campaignDetails.helpers({
    campaign: function () {
        let id = parseInt(Session.get('campaignId'));
        return Campaigns.findOne({_id: id});
    }
});