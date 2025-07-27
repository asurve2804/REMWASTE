
Feature: Login functionality for react app

    Verifying the login functionality for react website

    Scenario: Verify the header, email and password textboxes and login button when user navigates on the react page
        Given User visits the website
        Then Header, email and passowrd textboxes and login button is visible

    Scenario: Verify when the user try to login with valid email and valid password
        Given User visits the website
        When User inputs valid email and valid passoword
        And User clicks on login button
        Then User lands on the homepage with the welcome message displaying on the top of the page

    Scenario: Verify when the user try to login with invalid email and valid password
        Given User visits the website
        When User inputs invalid email and valid passoword
        And User clicks on login button
        Then User gets invalid creds message

    Scenario: Verify when the user try to login with valid email and invalid password
        Given User visits the website
        When User inputs valid email and invalid passoword
        And User clicks on login button
        Then User gets invalid creds message

    Scenario: Verify when the user try to login with invalid email and invalid password
        Given User visits the website
        When User inputs invalid email and invalid passoword
        And User clicks on login button
        Then User gets invalid creds message

    Scenario: Verify when the user clicks on login button without providing any credentials
        Given User visits the website
        When User clicks on login button
        Then User gets invalid creds message