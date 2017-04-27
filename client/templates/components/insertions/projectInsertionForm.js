import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {publishInsertion} from '/client/lib/ethereum/contracts/insertionRegisterContractHelper';

import './providerInsertionForm.html';

Template.components_projectInsertionForm.onCreated(() => {
    Session.set('projectRateType', 'ETH');
});

Template.components_projectInsertionForm.onRendered(() => {
    $('.chips').material_chip({
        data: []
    });
    $('select').material_select();
});

Template.components_projectInsertionForm.helpers({
    isPercentage: () => {
        return Session.get('projectRateType') === 'PERCENTAGE';
    }
});

Template.components_projectInsertionForm.events({
    'click .js-change-rate' () {
        const projectRateType = Session.get('projectRateType') === 'PERCENTAGE' ? 'ETH' : 'PERCENTAGE';
        Session.set('projectRateType', projectRateType);
    },
    'click .js-publish' () {
        let skillsString = '';
        const title = $('#title').val();
        const description = $('#description').val();
        const skills = $('.chips').material_chip('data');
        const projectRate = Session.get('projectRateType') === 'PERCENTAGE'
            ? $('#percentRate').val() / 100
            : web3.toWei($('#etherRate').val(), 'ether');
        const valueType = $('#unit').val(); // 1 === sold unit, 2 === likes, ...
        for (let i = 0; i < skills.length; i++) {
            skillsString += skills[i].tag + '#';
        }
        publishInsertion(title, description, skillsString, true, 0, projectRate, valueType, () => {
            FlowRouter.go('/insertions');
        });
    }
});