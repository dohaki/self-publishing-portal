pragma solidity ^0.4.0;

contract owned {
    function owned() { owner = msg.sender; }
    address owner;
    modifier onlyOwner {
        if (msg.sender != owner)
            throw;
        _;
    }
}

contract mortal is owned {
    function close() onlyOwner {
        selfdestruct(owner);
    }
}

contract UserRegister is mortal {

    struct User {
        string userName;
    }

    address [] internal userIndex;

    mapping(address => User) public users;

    event JoinSuccess(address userAddress, string userName);

    modifier isUnique(string name) {
        for (uint i = 0; i < userIndex.length; i++) {
            if (stringsEqual(users[userIndex[i]].userName, name))
                throw;
        }
        _;
    }

    function UserRegister() {}

    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}

    function join(string userName) isUnique(userName) {
        userIndex.push(msg.sender);
        users[msg.sender] = User(userName);
        JoinSuccess(msg.sender, userName);
    }

}