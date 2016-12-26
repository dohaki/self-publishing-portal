import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import {publishInsertion} from '/client/lib/ethereum/contracts/insertionRegisterContractHelper';

import './providerInsertionForm.html';

Template.components_projectInsertionForm.onRendered(function () {
    $('.chips').material_chip();
});

Template.components_projectInsertionForm.events({
    'click .js-start' () {
        let skillsString = '';
        const title = $('#title').val();
        const description = $('#description').val();
        const skills = $('.chips').material_chip('data');
        const budget = web3.toWei($('#budget').val(), 'ether');
        const hourlyRate = web3.toWei($('#hourlyRate').val(), 'ether');
        for (let i = 0; i < skills.length; i++) {
            skillsString += skills[i].tag + '#';
        }
        publishInsertion(title, description, skillsString, true, hourlyRate, budget, () => {
           FlowRouter.go('/insertions');
        });
    }
});