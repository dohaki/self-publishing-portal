import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {ReactiveVar} from 'meteor/reactive-var';

import './contractCreate.html';

Template.views_contractCreate.onCreated(() => {

});

Template.views_contractCreate.onRendered(() => {

});

Template.views_contractCreate.events({

});

Template.views_contractCreate.helpers({
    hiredBid: () => {
        return Session.get('hiredBid');
    }
});