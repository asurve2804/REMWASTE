import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Login from "../../e2e/PageObjects/login";
import HomePage from "../../e2e/PageObjects/HomePage";

let userData;

beforeEach(() => {
  cy.fixture("homepage").then(function (testData) {
    userData = testData;
  });
});

const login = new Login();
const homePage = new HomePage();

// Scenario: Verify the Header, text box, buttons and text message on the web page
Given("User visits website and logs in", () => {
  cy.visit(Cypress.env("url"));
  login.getEmailId().type(Cypress.env("email"));
  login.getPassword().type(Cypress.env("password"));
  login.getLoginButton().click();
});
Then("Header, text box, buttons and text message is visible", () => {
  homePage.getAddButton().should("be.visible");
  login
    .getHomePageHeader()
    .should("have.text", userData.homePageHeader + Cypress.env("email"));
  homePage.getLogoutButton().should("be.visible");
  homePage.getNewItemTextBox().should("be.visible");
  homePage.getTextMessage().should("be.visible");
});

// Scenario: Verify when user clicks on logout button

When("User clicks on log out button", () => {
  homePage.getLogoutButton().click();
});

Then(
  "User is logged out of the page and navigate back on to login page",
  () => {
    login.getPageHeader().should("have.text", userData.header);
  }
);

// Scenario: Verify the message when no data available on the home page

Then("User sees the no item message if data is not avilable", () => {
  homePage.getTextMessage().should("have.text", userData.noDataTextMsg);
});

// Scenario: Verify if no data is avilabe add atleast one data and check the message and count

When("User adds the value in the text box and clicks on add button", () => {
  userData.firstData.forEach((value) => {
    homePage.getNewItemTextBox().type(value);
    homePage.getAddButton().click();
  });
});

Then("User sees the message with the count of added items", () => {
  homePage.getListCount();
});

// Scenario: Verify when user deletes the added value it should not exist and count of items should match

When("User deletes one of the item from the list", () => {
  homePage.getListOfAddedValues().each(($e1, list, $index) => {
    const deleteValue = $e1.text();
    if (deleteValue === userData.deleteValue) {
      cy.contains("li span", deleteValue)
        .parents("li")
        .find("div.space-x-2 .bg-red-500")
        .click();
    }
  });
  cy.log("No record found");
});
Then("Deleted item does not not exist and count is updated", () => {
  homePage.getListOfAddedValues().should("not.have.text", userData.deleteValue);
  homePage.getListOfAddedValues();
});

// Scenario: Verify when user Edits the added value it should update it while count remain the same

When("User Edits one of the item from the list", () => {
  homePage.getListOfAddedValues().each(($e1, list, $index) => {
    const editValue = $e1.text();
    if (editValue === userData.deleteValue) {
      cy.contains("li span", editValue)
        .parents("li")
        .find("div.space-x-2 .bg-blue-400")
        .click();
      homePage.getNewItemTextBox().clear().type(userData.updatedValue);
      homePage.getUpdateButton().click();
    }
  });
  cy.log("No record found");
});
Then("Item is edited with new value and count remaining the same", () => {
  homePage.getListOfAddedValues().each(($e1, list, $index) => {
    const updatedValue = $e1.text();
    cy.log(updatedValue);
    if (updatedValue === userData.updatedValue) {
      expect(updatedValue).to.equal(userData.updatedValue);
    }
  });
  homePage.getListCount();
});
