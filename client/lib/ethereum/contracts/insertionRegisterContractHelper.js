import {Session} from 'meteor/session';

import {upsertInsertion, updateInsertion} from '/client/lib/helpers/insertionCollectionHelper';
import {pendingTransaction} from '/client/lib/helpers/ethereumHelper';

const abiArray = [{
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "insertionIds",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "title", "type": "string"}, {"name": "description", "type": "string"}, {
        "name": "skills",
        "type": "string"
    }, {"name": "isProject", "type": "bool"}, {"name": "hourlyRate", "type": "uint256"}, {
        "name": "projectRate",
        "type": "uint256"
    }, {"name": "valueTypeId", "type": "uint256"}],
    "name": "publishInsertion",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "uint256"}],
    "name": "insertions",
    "outputs": [{"name": "_id", "type": "uint256"}, {"name": "title", "type": "string"}, {
        "name": "description",
        "type": "string"
    }, {"name": "owner", "type": "address"}, {"name": "skills", "type": "string"}, {
        "name": "isProject",
        "type": "bool"
    }, {"name": "hourlyRate", "type": "uint256"}, {"name": "projectRate", "type": "uint256"}, {
        "name": "valueType",
        "type": "uint8"
    }, {"name": "isActive", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "deactivateInsertion",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "insertionCounter",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {"inputs": [], "payable": false, "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "owner", "type": "address"}, {
        "indexed": false,
        "name": "_id",
        "type": "uint256"
    }],
    "name": "InsertionPublished",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "_id", "type": "uint256"}],
    "name": "InsertionDeactivated",
    "type": "event"
}];

const address = "0xbd713c2580a16de3b344ec2575e9ec8610f81043";

InsertionRegisterContract = web3.eth.contract(abiArray).at(address);

export function getInsertionFromContract(insertionId) {
    InsertionRegisterContract.insertions(insertionId, (error, result) => {
        if (error) console.error(error);
        else {
            const skillsArray = result[4].split('#');
            let skills = [];
            for (let i = 0; i < skillsArray.length; i++) {
                if (skillsArray[i]) skills.push(skillsArray[i]);
            }
            let insertion = {
                _id: new BigNumber(result[0]).toNumber(),
                title: result[1],
                description: result[2],
                owner: result[3],
                skills: skills,
                isProject: result[5],
                hourlyRate: new BigNumber(result[6]).toNumber(),
                projectRate: new BigNumber(result[7]).toNumber(),
                valueType: new BigNumber(result[8]).toNumber(),
                isActive: result[9]
            };
            upsertInsertion(insertionId, insertion);
        }
    });
}

export function getAllInsertionFromContract() {
    InsertionRegisterContract.insertionCounter((error, result) => {
        if (error) console.error(error);
        else {
            const insertionCounter = new BigNumber(result).toNumber();
            for (let i = 1; i <= insertionCounter; i++) {
                getInsertionFromContract(i);
            }
        }
    });
}

export function publishInsertion(title, description, skills, isProject, hourlyRate, projectRate, valueType, cb) {
    Session.set('waitingForConfirmation', true);
    InsertionRegisterContract.publishInsertion(title, description, skills, isProject, hourlyRate, projectRate, valueType, (error, result) => {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            let publishInsertionTx;
            if (isProject) {
                publishInsertionTx = {
                    type: 'Insertions',
                    title: 'New project insertion published',
                    description: 'You published a new project insertion.'
                }
            } else {
                publishInsertionTx = {
                    type: 'Insertions',
                    title: 'New insertion published',
                    description: 'You published a new insertion.'
                }
            }
            pendingTransaction(result, publishInsertionTx, () => {
                if (cb) cb();
            })
        }
    });
}

export function deactivateInsertion(insertionId, cb) {
    Session.set('waitingForConfirmation', true);
    InsertionRegisterContract.deactivateInsertion(insertionId, (error, result) => {
        Session.set('waitingForConfirmation', false);
        if (error) {
            console.error(error);
            Materialize.toast('You have to accept the transaction', 3000);
        } else {
            const deactivationTx = {
                type: 'Insertions',
                title: 'Deactivation of insertion',
                description: 'You deactivated an insertion.'
            };
            pendingTransaction(result, deactivationTx, () => {
                if (cb) cb();
            });
        }
    });
}

/**
 * Sobald eine neue Kampagne erstellt wurde, füge diese auch in der lokalen DB ein
 */
InsertionRegisterContract.InsertionPublished().watch(function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('event InsertionPublished fired!');
        console.log(result);
        getInsertionFromContract(new BigNumber(result.args._id));
    }
});