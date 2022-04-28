import { IUser } from "../models/userInterface";

class UsersHelper {
  private sortUsers(users:IUser[]) {
    const orderedUsers = users.sort((a, b) => {
      return a.firstname === b.firstname ? 0: a.firstname > b.firstname ? 1: -1;
    });
    return orderedUsers;
  }

  private upperLastname(users:IUser[]) {
    const upperUsers = users.map(user => ({
      firstname:user.firstname,
      lastname:user.lastname.toUpperCase(),
      username:user.username,
      email:user.email
    }));
    return upperUsers;
  }

  sortUsersUpperLastname(users:IUser[]) {
    const sortedUsers = this.sortUsers(users);
    const sortedUpperUsers = this.upperLastname(sortedUsers);
    return sortedUpperUsers;
  }

  findABCNames(users:IUser[]) {
    const sortedUsers = this.sortUsers(users);
    const abcUsers = sortedUsers.filter(user =>
      user.firstname[0].toLowerCase() === 'a' ||
      user.firstname[0].toLowerCase() === 'b' ||
      user.firstname[0].toLowerCase() === 'c');
    return abcUsers;
  }

  private countNames(users:IUser[], letter:string) {
    const count:number = users.filter(user => user.firstname[0].toLowerCase() === letter)
      .reduce((sum, user) => sum + 1,0);
    return count;
  }

  countABCNames(users:IUser[]) {
    const aCounter:number = this.countNames(users, 'a');
    const bCounter:number = this.countNames(users,'b');
    const cCounter:number = this.countNames(users,'c');
    return {
      aNames: aCounter,
      bNames: bCounter,
      cNames: cCounter
    }
  }
}

export default UsersHelper;
