/* eslint-disable no-undef */
//! Cypress tests utilize the Mocha testing library under the hood
//! Passing arrow functions (aka "lambdas") to Mocha is discouraged. Lambdas lexically
//! bind `this` and cannot access the Mocha context, For example, the following code will fail

/*
describe('my suite', () => {
  it('my test', () => {
    //* should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});
*/
const testName = "Superuser";
const testUser = "root";
const testPass = "salainen";

describe("Note app", function () {
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
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  //this test is basically a buffer i am not sure why the second request
  //for the server always yields AxiosError: Request Aborted
  it("login form can be opened", function () {
    cy.contains("Log in").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("Log in").click();
    cy.get("#username").type(testUser);
    cy.get("#password").type("wrongPass");
    cy.get("#login-button").click();

    //firefox returns null when searching for border-style css property
    //one solution would be to check top, bottom, left, adn right border
    //*solution posted by lblanch on this thread https://github.com/cypress-io/cypress/issues/9349
    cy.get(".error")
      .should("contain", "Wrong Credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-top-style", "solid")
      .and("have.css", "border-bottom-style", "solid")
      .and("have.css", "border-left-style", "solid")
      .and("have.css", "border-right-style", "solid");

    cy.get("html").should("not.contain", "Superuser logged in");
  });

  it("user can log in", function () {
    cy.contains("Log in").click();
    cy.get("#username").type(testUser);
    cy.get("#password").type(testPass);
    cy.get("#login-button").click();
  });

  describe("when logged in", function () {
    beforeEach(function () {
      //*Logging in can be accomplished much faster through completing a post
      //*request over typing out a form

      //?cy.request, like all cypress commands, are promises
      // cy.request("POST", "http://localhost:3001/api/login", {
      //   username: testUser,
      //   password: testPass,
      // }).then((response) => {
      //   localStorage.setItem(
      //     "loggedNoteAppUser",
      //     JSON.stringify(response.body)
      //   );
      //   cy.visit("");
      // });
      //!Can replace above code with custom command to handle login ^^^^^
      cy.login({ username: testUser, password: testPass });
    });
    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").contains("make important").click();

        cy.contains("second note").contains("make not important");
      });
    });

    it("a new note can be created", function () {
      cy.contains("Create new Note").click();
      cy.get("#note").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
        // cy.contains("Create new Note").click();
        // cy.get("#note").type("another note cypress");
        // cy.contains("save").click();
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    });
  });
});
