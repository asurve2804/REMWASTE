import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Login from "../../e2e/PageObjects/login";

let userData;

beforeEach(() => {
  cy.fixture("login").then(function (testData) {
    userData = testData;
  });
});

const login = new Login();

// Scenario: Verify the header, email and password textboxes and login button when user navigates on the react page

Given("User visits the website", () => {
  cy.visit(Cypress.env("url"));
});
Then("Header, email and passowrd textboxes and login button is visible", () => {
  login.getPageHeader().should("have.text", userData.header);
  login.getEmailId().should("be.visible");
  login.getPassword().should("be.visible");
  login.getPassword().should("be.visible");
});

// Scenario: Verify when the user try to login with valid email and valid password

When("User inputs valid email and valid passoword", () => {
  login.getEmailId().type(Cypress.env("email"));
  login.getPassword().type(Cypress.env("password"));
});
When("User clicks on login button", () => {
  login.getLoginButton().click();
});
Then(
  "User lands on the homepage with the welcome message displaying on the top of the page",
  () => {
    login
      .getHomePageHeader()
      .should("have.text", userData.homePageHeader + Cypress.env("email"));
  }
);

// Scenario: Verify when the user try to login with invalid email and valid password

When("User inputs invalid email and valid passoword", () => {
  login.getEmailId().type(userData.invalidEmail);
  login.getPassword().type(Cypress.env("password"));
});
Then("User gets invalid creds message", () => {
  login.getErrorMsg().should("have.text", userData.invalidCred);
});

//Scenario: Verify when the user try to login with valid email and invalid password

When("User inputs valid email and invalid passoword", () => {
  login.getEmailId().type(Cypress.env("email"));
  login.getPassword().type(userData.invalidPassword);
});

//Scenario: Verify when the user try to login with invalid email and invalid password

When("User inputs invalid email and invalid passoword", () => {
  login.getEmailId().type(userData.invalidEmail);
  login.getEmailId().type(userData.invalidPassword);
});
