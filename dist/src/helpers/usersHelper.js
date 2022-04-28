"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersHelper {
    sortUsers(users) {
        const orderedUsers = users.sort((a, b) => {
            return a.firstname === b.firstname ? 0 : a.firstname > b.firstname ? 1 : -1;
        });
        return orderedUsers;
    }
    upperLastname(users) {
        const upperUsers = users.map(user => ({
            firstname: user.firstname,
            lastname: user.lastname.toUpperCase(),
            username: user.username,
            email: user.email
        }));
        return upperUsers;
    }
    sortUsersUpperLastname(users) {
        const sortedUsers = this.sortUsers(users);
        const sortedUpperUsers = this.upperLastname(sortedUsers);
        return sortedUpperUsers;
    }
    findABCNames(users) {
        const sortedUsers = this.sortUsers(users);
        const abcUsers = sortedUsers.filter(user => user.firstname[0].toLowerCase() === 'a' ||
            user.firstname[0].toLowerCase() === 'b' ||
            user.firstname[0].toLowerCase() === 'c');
        return abcUsers;
    }
    countNames(users, letter) {
        const count = users.filter(user => user.firstname[0].toLowerCase() === letter)
            .reduce((sum, user) => sum + 1, 0);
        return count;
    }
    countABCNames(users) {
        const aCounter = this.countNames(users, 'a');
        const bCounter = this.countNames(users, 'b');
        const cCounter = this.countNames(users, 'c');
        return {
            aNames: aCounter,
            bNames: bCounter,
            cNames: cCounter
        };
    }
}
exports.default = UsersHelper;
