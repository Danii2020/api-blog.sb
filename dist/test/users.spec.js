"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const usersHelper_1 = __importDefault(require("../src/helpers/usersHelper"));
const usersMock_1 = require("./mocks/usersMock");
const usersHelper = new usersHelper_1.default();
describe("sortUsers()", () => {
    context("when the sortUsers() function is invoked", () => {
        it("returns all the users sorted by name and with their lastname in uppercase", async () => {
            const sortedUsers = usersHelper.sortUsersUpperLastname(usersMock_1.usersMock);
            (0, chai_1.expect)(sortedUsers).length(5);
            (0, chai_1.expect)(sortedUsers[0].firstname).to.be.equals("Andrea");
            (0, chai_1.expect)(sortedUsers[4].firstname).to.be.equals("Fernando");
            (0, chai_1.expect)(sortedUsers[0].lastname).to.be.equals("PASCAL");
            (0, chai_1.expect)(sortedUsers[4].lastname).to.be.equals("CORREA");
        });
    });
});
describe("findABCNames()", () => {
    context("when the findABCNames() function is invoked", () => {
        it("returns all the users whose firstname starts with 'A', 'B' and 'C'", async () => {
            const abcNames = usersHelper.findABCNames(usersMock_1.usersMock);
            (0, chai_1.expect)(abcNames).length(3);
            (0, chai_1.expect)(abcNames[0].firstname).to.be.equals("Andrea");
            (0, chai_1.expect)(abcNames[1].firstname).to.be.equals("Bernarda");
            (0, chai_1.expect)(abcNames[2].firstname).to.be.equals("Carlos");
        });
    });
});
describe("countABCNames()", () => {
    context("when the countABCNames() function is invoked", () => {
        it("returns an object with a count of users whose firstname starts with 'A', 'B' and 'C'", async () => {
            const countAbcNames = usersHelper.countABCNames(usersMock_1.usersMock);
            (0, chai_1.expect)(countAbcNames.aNames).to.be.equals(1);
            (0, chai_1.expect)(countAbcNames.bNames).to.be.equals(1);
            (0, chai_1.expect)(countAbcNames.cNames).to.be.equals(1);
        });
    });
});
