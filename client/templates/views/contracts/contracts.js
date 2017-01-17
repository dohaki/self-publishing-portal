import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {createIndividualContract, changeContract} from '/client/lib/ethereum/contracts/individualContractHelper';

import './contracts.html';

Template.views_contracts.onCreated(() => {
});

Template.views_contracts.onRendered(() => {
});

Template.views_contracts.events({
    'click .js-create-contract' () {
        FlowRouter.go('/contracts/create');
    },
    'click .js-change-contract' () {
        const contractAddress = '0x19ec5ddb164be1a96e6f679aeff7a8949b2e7b8a';
        const name = 'Veränderter Vertrag'; // max 50 Zeichen
        const description = 'Veränderter Beschreibungstext'; // max 150 Zeichen
        const varReward = web3.toWei(2, 'ether');
        const fixReward = web3.toWei(3, 'ether');
        const valueTypeId = 1;
        const contractTypeIds = [1,2];
        changeContract(contractAddress, name, description, fixReward, varReward, valueTypeId, contractTypeIds, () => {
            console.log('CHANGE-CONTRACT CALLBACK');
        });
    }
});

Template.views_contracts.helpers({
    pendingTransactions: () => {
        return Transactions.find({
            status: 'PENDING',
            type: 'Contract'
        }).fetch();
    },
    pendingContracts: () => {
        return Contracts.find({
            isActive: true,
            isAccepted: false,
            isFullfilled: false
        }).fetch();
    },
    fullfilledContracts: () => {
        return Contracts.find({
            isActive: true,
            isAccepted: true,
            isFullfilled: true
        }).fetch();
    }
});