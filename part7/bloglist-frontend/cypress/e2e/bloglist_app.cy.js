describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "emily",
      name: "emily watsons",
      password: "magic",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "daniel",
      name: "daniel robertson",
      password: "magic",
    });
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("emily");
      cy.get("#password").type("magic");
      cy.get("#login-button").click();
      cy.contains("emily watsons logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("emily");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
      cy.get("#notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "emily", password: "magic" });
    });

    it("A blog can be created", function () {
      cy.contains("create new").click();
      cy.get("#title").type("Reach out for the stars");
      cy.get("#author").type("Dan Grey");
      cy.get("#url").type("www.dangrey.com");
      cy.get("#createblog-button").click();
      cy.contains("a new blog Reach out for the stars by Dan Grey added");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        const loggedInUser = window.localStorage.getItem("loggedInUser");
        const blog = {
          title: "Reach out for the stars",
          author: "Dan Grey",
          url: "www.dangrey.com",
          user: loggedInUser,
        };
        cy.createBlog(blog);
      });

      it("A blog can be liked", function () {
        cy.contains("Reach out for the stars")
          .contains("view")
          .click()
          .parent()
          .parent()
          .contains("like")
          .click();
      });

      it("User who created blog can delete it", function () {
        cy.contains("Reach out for the stars")
          .contains("view")
          .click()
          .parent()
          .parent()
          .contains("remove")
          .click();
        cy.get("html").should("not.contain", "Reach out for the stars");
      });

      describe("And logout and logged in with another user", function () {
        beforeEach(function () {
          cy.contains("logout").click();
          cy.login({ username: "daniel", password: "magic" });
        });
        it("Only user who created blog can delete it", function () {
          cy.contains("Reach out for the stars").contains("view").click();
          cy.contains("Reach out for the stars")
            .parent()
            .parent()
            .get("remove")
            .should("not.exist");
        });
      });
    });

    describe("and multiple blog exists", function () {
      beforeEach(function () {
        const loggedInUser = window.localStorage.getItem("loggedInUser");
        cy.createBlog({
          title: "The title with the second most likes",
          author: "Dan Grey",
          url: "www.dangrey.com",
          user: loggedInUser,
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "Reily Miran",
          url: "www.reilymiran.com",
          user: loggedInUser,
        });
      });
      it("blogs are ordered by likes with the blog with the most likes being first", function () {
        cy.contains("The title with the most likes").contains("view").click();
        cy.contains("The title with the second most likes")
          .contains("view")
          .click();
        cy.contains("The title with the most likes")
          .parent()
          .find("#like-button")
          .as("LikeButton1");
        cy.contains("The title with the second most likes")
          .parent()
          .find("#like-button")
          .as("LikeButton2");
        cy.get("@LikeButton1").click().click().click();
        cy.get("@LikeButton2").click().click();
        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
      });
    });
  });
});
