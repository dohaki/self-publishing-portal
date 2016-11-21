import { Template } from 'meteor/templating';

import './loginMask.html';

Template.components_loginMask.helpers({
    accounts: EthAccounts.find().fetch()
});