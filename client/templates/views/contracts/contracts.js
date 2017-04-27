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
            isFullfilled: false,
            $or: [{contractPartner: account}, {creator: account}]
        }).fetch();
    },
    acceptedContracts: () => {
        return Contracts.find({
            isActive: true,
            isAccepted: true,
            $or: [{contractPartner: account}, {creator: account}]
        }).fetch();
    }
    // contractsToBeFullfilled: () => {
    //     return Contracts.find({
    //         isActive: true,
    //         isAccepted: true,
    //         isFullfilled: false,
    //         $or: [{contractPartner: account}, {creator: account}]
    //     });
    // },
    // fullfilledContracts: () => {
    //     return Contracts.find({
    //         isActive: true,
    //         isAccepted: true,
    //         isFullfilled: true,
    //         $or: [{contractPartner: account}, {creator: account}]
    //     }).fetch();
    // }
});