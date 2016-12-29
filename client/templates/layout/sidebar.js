import {Template} from 'meteor/templating';

import './sidebar.html';

Template.layout_sidebar.onRendered(() => {
});

Template.layout_sidebar.helpers({
    user: () => {
        return Users.findOne({userAddress: account});
    },
    account: () => {
        return EthAccounts.find().fetch()[0];
    },
    isActive: (route) => {
        return (FlowRouter.getRouteName() === route);
    }
});

Template.layout_sidebar.events({});