import {Template} from 'meteor/templating';

import './campaignCreateBackground.html';

Template.components_campaignCreateBackground.onRendered(function () {
    $(function() {
        $('div#froala-editor').froalaEditor({
        })
    });
});

Template.components_campaignCreateBackground.events({
    // geht ein Tab weiter nach rechts
    'click .js-next'() {
        $('ul.tabs').tabs('select_tab', 'author');
    },
    // geht ein Tab weiter nach links
    'click .js-back'() {
        $('ul.tabs').tabs('select_tab', 'basic');
    },
    'click .js-start'() {
        console.log($('div#froala-editor').froalaEditor('html.get'));
    }
});