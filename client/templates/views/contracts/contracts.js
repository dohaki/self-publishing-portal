import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import {createIndividualContract, changeContract} from '/client/lib/ethereum/contracts/individualContractHelper';

import './contracts.html';

Template.views_contracts.onCreated(() => {
});

Template.views_contracts.onRendered(() => {
});

Template.views_contracts.events({
    'click .js-create-contract' () {
        //FlowRouter.go('/contracts/create');
        const name = 'Contract zwischen dhkim und ubuntu';
        const description = 'bla bal bla';
        const contractPartner = '0xf862a22835e7c3560af9498ea60f1425427aaee5';
        const varReward = web3.toWei(2, 'ether');
        const fixReward = web3.toWei(3, 'ether');
        const valueTypeId = 1;
        const contractTypeIds = [1,2,3];
        createIndividualContract(name, description, contractPartner, fixReward, varReward, valueTypeId, contractTypeIds, () => {
            console.log('CALLBACK');
        });
    },
    'click .js-change-contract' () {
        const contractAddress = '0xcdec70e622d0263ce404876166e2499561905237';
        const name = 'etwas kürzerer Tittle'; // max 50 Zeichen
        const description = 'Noch mal Änderung es sdjaisd kdjcks dckdlsckndoe dfoejforpjf'; // max 150 Zeichen
        const varReward = web3.toWei(2, 'ether');
        const fixReward = web3.toWei(3, 'ether');
        const valueTypeId = 1;
        const contractTypeIds = [1,2,3];
        changeContract(contractAddress, name, description, fixReward, varReward, valueTypeId, contractTypeIds, () => {
            console.log('CHANGE-CONTRACT CALLBACK');
        });
    }
});

Template.views_contracts.helpers({
    pendingTransactions: () => {
        return Transactions.find({
            status: 'PENDING',
            type: 'Contract'
        }).fetch();
    },
    pendingContracts: () => {
        return Contracts.find({
            isActive: true,
            isAccepted: false,
            isFullfilled: false
        }).fetch();
    },
    fullfilledContracts: () => {
        return Contracts.find({
            isActive: true,
            isAccepted: true,
            isFullfilled: true
        }).fetch();
    }
});