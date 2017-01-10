account = web3.eth.accounts[0];

// initialize Ethereum Accounts
EthAccounts.init();

// Global routes trigggers
FlowRouter.triggers.enter([checkValidAccount], {except: ['login']});

/**
 * Überprüft, ob ein gültiger Ethereum-Account vorhanden ist
 */
function checkValidAccount() {
    if (EthAccounts.find().fetch().length === 0) {
        FlowRouter.go('/error'); // falls kein Ethereum Account vorliegt, auf Hinweis-Seite (MIST, Metamask)
    } else {
        UserRegisterContract.users(account, (error, result) => {
            if (error) {
                console.error('init.js - checkValidAccount');
            } else if (result[0] === '' && result[1] === '') {
                FlowRouter.go('/login');
            } else {
                const user = {
                    userName: result[0],
                    mailAddress: result[1],
                    userAddress: account
                };
                Users.upsert({ userAddress: account }, user);
            }
        });
    }
}

/**
 * Überprüfe, ob der Ethereum-Account sich ändert jede Sekunde
 */
setInterval(function () {
    if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        checkValidAccount();
    }
}, 1000);