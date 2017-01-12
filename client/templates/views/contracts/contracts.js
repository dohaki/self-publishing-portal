import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {createIndividualContract} from '/client/lib/ethereum/contracts/individualContractHelper';

import './contracts.html';

Template.views_contracts.onCreated(() => {
});

Template.views_contracts.onRendered(() => {
});

Template.views_contracts.events({
    'click .js-create-contract' () {
        //FlowRouter.go('/contracts/create');
        const name = 'test';
        const description = 'test';
        const contractPartner = '0xcc2100bd716ff32c0fb99f1fd2db9feaafba22fe';
        const varReward = web3.toWei(1, 'ether');
        const fixReward = web3.toWei(2, 'ether');
        const valueTypeId = 3;
        const contractTypeIds = [1,2,3];
        createIndividualContract(name, description, contractPartner, fixReward, varReward, valueTypeId, contractTypeIds, () => {
            console.log('CALLBACK');
        });
    }
});

Template.views_contracts.helpers({
    pendingTransactions: () => {
        return Transactions.find({status: 'PENDING', type: 'Contract'}).fetch();
    },
    pendingContracts: () => {

    },
    activeContracts: () => {

    }
});