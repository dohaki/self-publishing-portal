import {Template} from 'meteor/templating';

import './sidebar.html';

Template.layout_sidebar.onRendered(function () {
});

Template.layout_sidebar.helpers({
    account () {
        return EthAccounts.find().fetch()[0];
    }
});

Template.layout_sidebar.events({});