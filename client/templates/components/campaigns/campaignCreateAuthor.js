import {Template} from 'meteor/templating';

import './campaignCreateAuthor.html';

Template.components_campaignCreateAuthor.onRendered(function () {

});

Template.components_campaignCreateAuthor.events({
    // geht ein Tab weiter nach rechts
    'click .js-back'() {
        $('ul.tabs').tabs('select_tab', 'background');
    }
});