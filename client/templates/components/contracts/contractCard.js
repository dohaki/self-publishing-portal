import {Template} from 'meteor/templating';

import './contractCard.html';

Template.components_contractCard.onRendered(() => {

});

Template.components_contractCard.helpers({
    getStatus: (contract) => {
        const {isAccepted, isFullfilled, creator, contractPartner, turnOf} = contract;
        if ((turnOf === account) && (account === creator)) {
            if (!isAccepted && !isFullfilled) return 'Partner declined';
            else if (isAccepted && !isFullfilled) return 'Accepted';
            // else if (isAccepted && isFullfilled) return 'Fullfilled';
        } else if ((turnOf === account) && (account === contractPartner)) {
            if (!isAccepted && !isFullfilled) return 'You have to accept or decline';
            else if (isAccepted && !isFullfilled) return 'Accepted';
            // else if (isAccepted && isFullfilled) return 'Fullfilled';
        } else if ((turnOf !== account) && (account === creator)) {
            if (!isAccepted && !isFullfilled) return 'Waiting for answer from partner';
            else if (isAccepted && !isFullfilled) return 'Accepted';
            // else if (isAccepted && isFullfilled) return 'Fullfilled';
        } else if ((turnOf !== account) && (account === contractPartner)) {
            if (!isAccepted && !isFullfilled) return 'You declined';
            else if (isAccepted && !isFullfilled) return 'Accepted';
            // else if (isAccepted && isFullfilled) return 'Fullfilled';
        }
    }
});