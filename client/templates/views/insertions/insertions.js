import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {getAllInsertionFromContract} from '/client/lib/ethereum/contracts/insertionRegisterContractHelper';

import './insertions.html';

// Home routes
FlowRouter.route('/insertions', {
    name: 'insertions',
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertions',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_insertions.onCreated(() => {

});

Template.views_insertions.onRendered(() => {
    $('ul.tabs').tabs();
    getAllInsertionFromContract();

});

Template.views_insertions.events({
    'click .js-create-insertion'(event) {
        FlowRouter.go('/insertions/create');
    },
});

Template.views_insertions.helpers({
    pendingTransactions: () => {
        return Transactions.find({status: 'PENDING', type: 'Insertions'}).fetch();
    },
    myLiveInsertions: () => {
        return Insertions.find({owner: account, isActive: true}).fetch();
    },
    projectInsertions: () => {
        return Insertions.find({isActive: true, isProject: true}).fetch();
    },
    providerInsertions: () => {
        return Insertions.find({isActive: true, isProject: false}).fetch();
    }
});