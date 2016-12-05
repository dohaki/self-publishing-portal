account = web3.eth.accounts[0];

// initialize Ethereum Accounts
EthAccounts.init();

// Global routes trigggers
FlowRouter.triggers.enter([checkValidAccount], {except: ['login']});

/**
 * Überprüft, ob ein gültiger Ethereum-Account vorhanden ist
 * @param context
 * @param redirect
 * @param stop
 */
function checkValidAccount() {
    if (EthAccounts.find().fetch().length === 0) {
        FlowRouter.go('/error'); // falls kein Ethereum Account vorliegt, auf Hinweis-Seite (MIST, Metamask)
    } else {
        UserRegisterContract.users(account, function (error, result) {
            if (error) {
                console.error('ERROR in checkValidAccount');
            } else if (!result[0]) {
                FlowRouter.go('/login');
            } else {
                let user = Users.findOne({userName: result[0], role: result[1], userAddress: account});
                if (!user) {
                    Users.insert({userName: result[0], role: result[1], userAddress: account});
                }
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