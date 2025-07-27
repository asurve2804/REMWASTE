
Feature: Homepage validation on react app

    Verifying the homepage on react website

    Scenario: Verify the Header, text box, buttons and text message on the web page
        Given User visits website and logs in
        Then Header, text box, buttons and text message is visible

    Scenario: Verify when user clicks on logout button
        Given User visits website and logs in
        When User clicks on log out button
        Then User is logged out of the page and navigate back on to login page

    Scenario: Verify the message when no data available on the home page
        Given User visits website and logs in
        Then User sees the no item message if data is not avilable

    Scenario: Verify when user deletes the added value it should not exist and count of items should match
        Given User visits website and logs in
        When User adds the value in the text box and clicks on add button
        And User deletes one of the item from the list
        Then Deleted item does not not exist and count is updated


    Scenario: Verify when user Edits the added value it should update it while count remain the same
        Given User visits website and logs in
        When User adds the value in the text box and clicks on add button
        And User Edits one of the item from the list
        Then Item is edited with new value and count remaining the same