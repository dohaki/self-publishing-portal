import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import {publishInsertion} from '/client/lib/ethereum/contracts/insertionRegisterContractHelper';

import './providerInsertionForm.html';

Template.components_providerInsertionForm.onRendered(function () {
    $('.chips').material_chip();
});

Template.components_providerInsertionForm.events({
    'click .js-start' () {
        let skillsString = '';
        const title = $('#title').val();
        const description = $('#description').val();
        const skills = $('.chips').material_chip('data');
        const hourlyRate = $('#hourlyRate').val();
        for (let i = 0; i < skills.length; i++) {
            skillsString += skills[i].tag + '#';
        }
        console.log(title);
        console.log(description);
        console.log(skills);
        console.log(hourlyRate);
        publishInsertion(title, description, skillsString, false, hourlyRate, 0, () => {
            FlowRouter.go('/insertions');
        });
    }
});