import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';
import {startCampaign} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

import './providerInsertionForm.html';

Template.components_projectInsertionForm.onRendered(function () {
    $('.chips').material_chip();
});

Template.components_projectInsertionForm.events({
    'click .js-start' () {
        const title = $('#title').val();
        const description = $('#description').val();
        const budget = $('#budget').val();
        const hourlyRate = $('#hourlyRate').val();
        console.log(title);
        console.log(description);
        console.log(hourlyRate);
    }
});