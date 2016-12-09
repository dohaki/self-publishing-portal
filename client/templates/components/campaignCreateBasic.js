import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './campaignCreateBasic.html';

Template.components_campaignCreateBasic.onRendered(function () {
    $('div#froala-editor').froalaEditor({});
});

Template.components_campaignCreateBasic.helpers({
    categories: [
        'Science fiction',
        'Satire',
        'Drama',
        'Action and Adventure',
        'Romance',
        'Mystery',
        'Horror',
        'Self help'
    ]
});

Template.components_campaignCreateBasic.events({
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'background');
    },
    'click .js-start'() {
        const title = $('#title').val();
        const description = $('#description').val();
        const category = $('#category').val();
        const goal = $('#goal').val();
        // rechne die Dauer in Tagen in Minuten um
        const duration = $('#duration').val() * 24 * 60;
        const html = $('div#froala-editor').froalaEditor('html.get');
        CrowdFundingContract.startCampaign(title, description, category, goal, duration, html, function (error, result) {
            if (error) console.error(error);
            else {
                EthereumHelper.pendingTransaction(result, function () {
                    FlowRouter.go('/campaigns');
                });
            }
        });
    }
});