import chai from 'chai';
import { expect } from 'chai';
import UsersHelper from '../src/helpers/usersHelper';
import { usersMock } from './mocks/usersMock';

const usersHelper = new UsersHelper();

describe("sortUsers()", () => {
  context("when the sortUsers() function is invoked", () => {
    it("returns all the users sorted by name and with their lastname in uppercase", async () => {
      const sortedUsers = usersHelper.sortUsersUpperLastname(usersMock);
      expect(sortedUsers).length(5);
      expect(sortedUsers[0].firstname).to.be.equals("Andrea");
      expect(sortedUsers[4].firstname).to.be.equals("Fernando");
      expect(sortedUsers[0].lastname).to.be.equals("PASCAL");
      expect(sortedUsers[4].lastname).to.be.equals("CORREA");
    });
  });
});

describe("findABCNames()", () => {
  context("when the findABCNames() function is invoked", () => {
    it("returns all the users whose firstname starts with 'A', 'B' and 'C'", async () => {
      const abcNames = usersHelper.findABCNames(usersMock);
      expect(abcNames).length(3);
      expect(abcNames[0].firstname).to.be.equals("Andrea");
      expect(abcNames[1].firstname).to.be.equals("Bernarda");
      expect(abcNames[2].firstname).to.be.equals("Carlos");
    });
  });
});

describe("countABCNames()", () => {
  context("when the countABCNames() function is invoked", () => {
    it("returns an object with a count of users whose firstname starts with 'A', 'B' and 'C'", async () => {
      const countAbcNames = usersHelper.countABCNames(usersMock);
      expect(countAbcNames.aNames).to.be.equals(1);
      expect(countAbcNames.bNames).to.be.equals(1);
      expect(countAbcNames.cNames).to.be.equals(1);
    });
  });
});
