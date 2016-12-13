import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

/**
 * Berechnet prozentualen Anteil
 * @param numerator - Zähler
 * @param denominator - Nenner
 */
Template.registerHelper('getPercentage', function (numerator, denominator) {
    return Math.round((numerator / denominator) * 100);
});

/**
 * Berechnet Differenz zwischen heute und Zieldatum
 * @param deadline - Zieldatum
 */
Template.registerHelper('getLeftDays', function (deadline) {
    let deadlineDate = new Date(deadline);
    let differenceInHours = Math.floor((deadlineDate - Date.now()) / (1000 * 60 * 60));
    if (differenceInHours > 24) {
        return Math.round(differenceInHours / 24) + ' days';
    } else {
        return Math.round(differenceInHours) + ' hours';
    }
});

Template.registerHelper('mining', function () {
   return Session.get('mining');
});

Template.registerHelper('getUserNameByAddress', function (address) {
    let user = Users.findOne({userAddress: address});
    return user.userName;
});