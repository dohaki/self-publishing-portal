import { Template } from 'meteor/templating';

import './campaignDetails.html';

FlowRouter.route('/campaigns/:campaignId', {
    action: function (params, queryParams) {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignDetails',
            sidebar: 'layout_sidebar'
        });
        console.log(params);
        console.log(queryParams);
        $(document).ready(function() {
            $('select').material_select();
        });
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }
});