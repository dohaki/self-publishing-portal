// Global routes trigggers
FlowRouter.triggers.enter([checkValidAccount], {except: ['login']});
//FlowRouter.triggers.enter([checkIfLoggedIn], {only: ['login']});

/**
 * Überprüft, ob ein gültiger Ethereum-Account vorhanden ist
 * @param context
 * @param redirect
 * @param stop
 */
function checkValidAccount (context, redirect, stop) {
    if (EthAccounts.find().fetch().length === 0) {
        redirect('/login');
    }
}

// function checkIfLoggedIn (context, redirect, stop) {
//     if (EthAccounts.find().fetch().length !== 0) { //TODO nur wenn es keinen Account gibt, weiterleiten zu home
//         redirect('/');
//     }
// }