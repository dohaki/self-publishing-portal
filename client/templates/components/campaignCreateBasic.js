import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';
import {campaignCategories} from '/client/lib/helpers/campaignCollectionHelper';

import './campaignCreateBasic.html';

Template.components_campaignCreateBasic.onCreated(function () {
    this.subCategories = new ReactiveVar([]);
});

Template.components_campaignCreateBasic.onRendered(function () {
    $('div#froala-editor').froalaEditor({});
});

Template.components_campaignCreateBasic.helpers({
    categories: campaignCategories,
    subCategories: function () {
        return Template.instance().subCategories.get();
    }
});

Template.components_campaignCreateBasic.events({
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'background');
    },
    'click .js-start'() {
        const title = $('#title').val();
        const description = $('#description').val();
        const category = $('#subCategory').val();
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
    },
    'change .js-category'() {
        const category = $('#category').val();
        for (var i = 0; i < campaignCategories.length; i++) {
            if (category === campaignCategories[i].category) {
                Template.instance().subCategories.set(campaignCategories[i].subCategories);
                break;
            }
        }
        $(document).ready(function() {
            $('select').material_select();
        });
    }
});