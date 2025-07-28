class HomePage {
  getHomePageHeader() {
    return cy.get(".text-xl.mb-4");
  }
  getLogoutButton() {
    return cy.get(".bg-gray-400");
  }
  getAddButton() {
    return cy.get(".bg-green-500");
  }
  getNewItemTextBox() {
    return cy.get('input[placeholder="New Item"]');
  }
  getTextMessage() {
    return cy.get(".mt-6");
  }
  getListOfAddedValues() {
    return cy.get("li span");
  }
  getEditButton() {
    return cy.contains("Surve").nextAll("Edit");
  }
  getUpdateButton() {
    return cy.contains("Update");
  }
  getListCount() {
    return cy
      .get("li")
      .should("exist")
      .its("length")
      .then((count) => {
        const expectedText = count;
        cy.get(".mt-6").should("have.text", "Total items: " + expectedText);
      });
  }
}
export default HomePage;
