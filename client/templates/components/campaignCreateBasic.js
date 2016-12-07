import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './campaignCreateBasic.html';

Template.components_campaignCreateBasic.onCreated(function () {
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
        $('ul.tabs').tabs('select_tab', 'rewards');
    },
    'click .js-start'() {
        const title = $('#title').val();
        const description = $('#description').val();
        const category = $('#category').val();
        const goal = $('#goal').val();
        const duration = $('#duration').val();
        CrowdFundingContract.startCampaign(title, description, category, goal, duration, function (error, result) {
            if (error) console.error(error);
            else {
                EthereumHelper.pendingTransaction(result, function () {
                    FlowRouter.go('/campaigns');
                });
            }
        });
    }
});