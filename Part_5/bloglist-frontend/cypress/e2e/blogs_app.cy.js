/* eslint-disable no-undef */
import "cypress-localstorage-commands";
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
    cy.restoreLocalStorage();
  });
  it("login form can be viewed", function () {
    cy.contains("blogs");
    cy.get("button.open-login-button").click();
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login functionality", function () {
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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: testUser, password: testPass });
    });
    it("a blog can be created", function () {
      // console.log(localStorage.getItem("loggedBlogAppUser"));
      cy.contains("Add New Blog").click();
      cy.get('[data-cy="blog-title"]').type("Dummy Blog");
      cy.get('[data-cy="blog-author"]').type("Dummy Author");
      cy.get('[data-cy="blog-url"]').type("dummyURL.com");
      cy.contains("Add Blog").click();
      cy.get('[data-cy="shown-blog-info"]')
        .should("include.text", "Dummy Blog")
        .and("include.text", "Dummy Author")
        .and("not.include.text", "dummyURL.com");
    });

    describe("When blog(s) exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "first author",
          url: "firsturl.com",
        });
        cy.createBlog({
          title: "second blog",
          author: "second author",
          url: "secondurl.com",
        });
        cy.createBlog({
          title: "third blog",
          author: "third author",
          url: "thirdurl.com",
        });
      });

      it.only("can add a like to a blog", function () {
        cy.contains("second blog").parent().find("button").click();
        cy.get('[data-cy="like-button"]').click();
        cy.wait(100);
        cy.get('[data-cy="blog-list"]').as("blogs");
        cy.get("@blogs").contains("second blog").find("button").click();
        cy.get('[data-cy="likes"]').should("include.text", "1");
      });
    });
  });
});
