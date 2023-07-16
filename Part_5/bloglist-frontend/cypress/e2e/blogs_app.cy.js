/* eslint-disable no-undef */

const testUser = "root";
const testName = "Superuser";
const testPass = "salainen";

describe("blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: testName,
      username: testUser,
      password: testPass,
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });
  it("login form can be viewed", function () {
    cy.contains("blogs");
    cy.get("button.open-login-button").click();
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("button.open-login-button").click();
      cy.get("#username").type(testUser);
      cy.get("#password").type(testPass);
      cy.get("button.login-button").click();
      cy.get("p.user-signed-in").should("include.text", testName);
    });

    it("fails with incorrect credentials", function () {
      cy.get("button.open-login-button").click();
      cy.get("#username").type(testUser);
      cy.get("#password").type("wrongpassword");
      cy.get("button.login-button").click();

      //test notif class contains correct css props
      cy.get(".notif")
        .should("contain", "Invalid Credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-top-style", "solid")
        .and("have.css", "border-bottom-style", "solid")
        .and("have.css", "border-left-style", "solid")
        .and("have.css", "border-right-style", "solid");
    });
  });
});
