import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {changeContract, acceptContract, declineContract, fullfillContract} from '/client/lib/ethereum/contracts/individualContractHelper';

import './contractDetails.html';

Template.views_contractDetails.onRendered(() => {

});

Template.views_contractDetails.helpers({
    contract: () => {
        const id = Session.get('contractId');
        return Contracts.findOne({_id: id});
    },
    getContractType: (contract) => {
        let count = contract.contractTypes.filter((type) =>{
           return type;
        }).length;
        if (count > 1) return 'Combined payment';
        else if (contract.contractTypes[0]) return 'Fixed payment';
        else return 'Variable payment';
    },
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

Template.views_contractDetails.events({
    'click .js-accept'() {
        const id = Session.get('contractId');
        const contractAddress = Contracts.findOne({_id: id}).contractAddress;
        acceptContract(contractAddress, () => {
            FlowRouter.go('/contracts');
        });
    },
    'click .js-decline'() {
        const id = Session.get('contractId');
        const contractAddress = Contracts.findOne({_id: id}).contractAddress;
        declineContract(contractAddress, () => {
            FlowRouter.go('/contracts');
        });
    },
    'click .js-change'() {
        // TODO Weiterleitung auf Formular für Ändern von Daten
    },
    'click .js-fullfill'() {
        const id = Session.get('contractId');
        const contractAddress = Contracts.findOne({_id: id}).contractAddress;
        fullfillContract(contractAddress, () => {
            FlowRouter.go('/contracts');
        });
    },
    'click .js-contact'() {
        const id = Session.get('contractId');
        const contract = Contracts.findOne({_id: id});
        let user;
        if (contract.creator === account) {
            user = Users.findOne({userAddress: contract.contractPartner});
        } else {
            user = Users.findOne({userAddress: contract.creator})
        }
        const subject = 'Contract';
        const emailBody = 'Hello ' + user.userName + '! Let\'s talk about the contract.' ;
        document.location = "mailto:"+user.mailAddress+"?subject="+subject+"&body="+emailBody;
    }
});