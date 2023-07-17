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

      it("can add a like to a blog", function () {
        cy.contains("second blog").parent().find("button").click();
        cy.get('[data-cy="like-button"]').click();
        cy.wait(100);
        cy.get('[data-cy="blog-list"]').as("blogs");
        cy.get("@blogs").contains("second blog").find("button").click();
        cy.get('[data-cy="likes"]').should("include.text", "1");
      });

      it("blog can be deleted by creating user", function () {
        //test delete functionality
        cy.contains("third blog").parent().find("button").click();
        cy.get('[data-cy="delete-blog-button"]').click();
        cy.get(".notif")
          .should("contain", "Blog successfully removed")
          .and("have.css", "color", "rgb(0, 128, 0)");
        cy.get('[data-cy="blog-list"]').as("blogs");
        cy.get("@blogs").children().should("have.length", 2);

        //test delete not allowed for non-creating user
        const user = {
          name: "invalidUser",
          username: "testUser",
          password: "gioSmells",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.login({ username: "testUser", password: "gioSmells" });
        cy.contains("second blog").parent().find("button").click();
        cy.contains("second blog")
          .parent()
          .should("not.have.text", "Delete Blog");
      });

      it("blogs are properly sorted base on number of likes", function () {
        cy.get('[data-cy="blog-list"]').as("blogs");
        cy.get("@blogs").contains("third blog").find("button").click();
        cy.get('[data-cy="like-button"]').click();
        cy.wait(100);
        cy.get("@blogs").eq(0).should("contain", "third blog");

        cy.get("@blogs").contains("second blog").find("button").click();
        cy.get('[data-cy="like-button"').click();
        cy.wait(100);
        cy.get("@blogs").contains("second blog").find("button").click();
        cy.get('[data-cy="like-button"').click();
        cy.get("@blogs").eq(0).should("contain", "second blog");
        cy.get("@blogs").eq(1).should("contain", "third blog");
      });
    });
  });
});
