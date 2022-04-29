describe("Test login view", () => {
  context("when the login page is visited", () => {
    it("logins a user with email and password", () => {
      cy.visit('http://localhost:3000/view/auth/login');
      cy.wait(10);

      cy.get("[id=email]")
        .type("daniel@gmail.com");

      cy.wait(10);

      cy.get("[id=password]")
        .type("daniel123");

      cy.wait(10);

      cy.get("[id=login-button]")
        .click()

      cy.url()
        .should("include", "/profile")

      cy.get("h1#username-title")
        .should("contain", "Daniel Mauricio's profile");
    });
  });
});
