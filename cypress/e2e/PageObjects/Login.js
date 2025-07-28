class Login {
  getEmailId() {
    return cy.get("input[placeholder='Email']");
  }
  getPassword() {
    return cy.get('input[placeholder="Password"]');
  }
  getPageHeader() {
    return cy.get(".text-xl.mb-4");
  }
  getLoginButton() {
    return cy.get("button");
  }
  getErrorMsg() {
    return cy.get(".text-red-500.mt-2");
  }
  getHomePageHeader() {
    return cy.get(".text-xl.mb-4");
  }
}
export default Login;
