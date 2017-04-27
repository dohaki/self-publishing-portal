import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {getUserNameByAddressFromContract} from '/client/lib/ethereum/contracts/userRegisterContractHelper';
import {VALUE_TYPE, CONTRACT_TYPE} from '/client/lib/constants';

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
    let differenceInSeconds = Math.floor((deadlineDate - Date.now()) / 1000);
    if (differenceInSeconds < 0) {
        return 'Over';
    } else if (differenceInSeconds < 60) {
        return Math.round(differenceInSeconds) + ' sec';
    } else if (differenceInSeconds < 60 * 60) {
        return Math.round(differenceInSeconds / 60) + ' min';
    } else if (differenceInSeconds < 60 * 60 * 24) {
        return Math.round(differenceInSeconds / (60 * 60)) + ' h';
    } else {
        return Math.round(differenceInSeconds / (60 * 60 * 24)) + ' days';
    }
});

Template.registerHelper('isOver', function (deadline) {
    let deadlineDate = new Date(deadline);
    let differenceInSeconds = Math.floor((deadlineDate - Date.now()) / 1000);
    return (differenceInSeconds < 0);
});

Template.registerHelper('mining', function () {
   return Session.get('mining');
});

Template.registerHelper('getUserNameByAddress', function (address) {
    const user = Users.findOne({userAddress: address});
    if (!user) return getUserNameByAddressFromContract(address);
    else return user.userName;
});

Template.registerHelper('isSelected', function (item) {
    return item.selected;
});

Template.registerHelper('waitingForConfirmation', function () {
   return Session.get('waitingForConfirmation');
});

Template.registerHelper('loading', function () {
    return (Session.get('waitingForConfirmation') || Session.get('mining'));
});

Template.registerHelper('isArrayEmpty', function (array) {
    return (array.length === 0);
});

Template.registerHelper('isPending', function (object) {
    return (object.status === 'PENDING');
});

Template.registerHelper('isTrue', function (boolean1, boolean2) {
    return (boolean1 && boolean2);
});

Template.registerHelper('isStringEqual', function (string1, string2) {
    return (string1 === string2);
});

Template.registerHelper('getValueTypeById', (id) => {
    switch (id) {
        case VALUE_TYPE.NONE: return '';
        case VALUE_TYPE.PIECE: return 'per piece';
        case VALUE_TYPE.HOUR: return 'per hour';
        case VALUE_TYPE.FACEBOOK_LIKES: return 'per like';
        case VALUE_TYPE.FACEBOOK_COMMENTS: return 'per comment';
        case VALUE_TYPE.FACEBOOK_SHARES: return 'per share';
    }
});

Template.registerHelper('getContractTypesById', (ids) => {
    let contractTypes = [];
    for (let i = 0; i < ids.length; i++) {
        switch (ids[i]) {
            case CONTRACT_TYPE.FIXED_PRICE: {
                contractTypes.push('fixed price');
                break;
            }
            case CONTRACT_TYPE.HOURLY_RATE: {
                contractTypes.push('hourly rate');
                break;
            }
            case CONTRACT_TYPE.ROYALTY: {
                contractTypes.push('royalty');
                break;
            }
            case CONTRACT_TYPE.VALUE_RATE: {
                contractTypes.push('value-based rate');
                break;
            }
        }
    }
    return contractTypes;
});