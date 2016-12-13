import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';

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
        const goal = web3.toWei($('#goal').val(), 'ether'); // wandle ether in wei um
        const duration = $('#duration').val() * 24 * 60; // rechne die Dauer in Tagen in Minuten um
        const html = $('div#froala-editor').froalaEditor('html.get');
        CrowdFundingContract.startCampaign(title, description, category, goal, duration, html, function (error, result) {
            if (error) console.error(error);
            else {
                pendingTransaction(result, function () {
                    FlowRouter.go('/campaigns');
                });
            }
        });
    }
});