import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './contracts.html';

// contracts routes
FlowRouter.route('/contracts', {
    name: 'contracts',
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contracts',
            sidebar: 'layout_sidebar'
        });
    }
});

Template.views_contracts.onCreated(() => {
});

Template.views_contracts.onRendered(() => {
});

Template.views_contracts.events({
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