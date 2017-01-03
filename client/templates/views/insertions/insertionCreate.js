import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {ReactiveVar} from 'meteor/reactive-var';

import './insertionCreate.html';

Template.views_insertionCreate.onCreated(function () {
    this.insertionType = new ReactiveVar();
});

Template.views_insertionCreate.onRendered(function () {
});

Template.views_insertionCreate.events({
    'click .js-choose-project'() {
        Template.instance().insertionType.set('project');
    },
    'click .js-choose-provider'() {
        Template.instance().insertionType.set('provider');
    }
});

Template.views_insertionCreate.helpers({
    insertionType: () => {
        return Template.instance().insertionType.get();
    }
});