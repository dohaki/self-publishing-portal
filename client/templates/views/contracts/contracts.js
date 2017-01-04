import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './contracts.html';

Template.views_contracts.onCreated(() => {
});

Template.views_contracts.onRendered(() => {
});

Template.views_contracts.events({
    'click .js-create-contract' () {
        Session.set('hiredBid');
        FlowRouter.go('/contracts/create');
    }
});

Template.views_contracts.helpers({
    pendingTransactions: () => {
        return Transactions.find({status: 'PENDING', type: 'Contracts'}).fetch();
    },
    pendingContracts: () => {

    },
    activeContracts: () => {

    }
});