const {sign_in_page } = require("../Selectors/sign_in_page");
const {sign_up_page} = require("../Selectors/sign_up_page");
const {bank_account_page} = require("../Selectors/bank_account_page")

Cypress.Commands.add("signUp", (firstName, lastName, userName, password) => {
    cy.visit("/signup")
    cy.intercept("POST", "/users").as("signup")
    cy.get(sign_up_page.input_first_name_field).type(firstName)
    cy.get(sign_up_page.input_last_name_field).type(lastName)
    cy.get(sign_up_page.input_user_name_field).type(userName)
    cy.get(sign_up_page.input_password_field).type(password)
    cy.get(sign_up_page.input_confirm_password_field).type(password)
    cy.get(sign_up_page.sign_up_button).click()
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
});

Cypress.Commands.add('firstLogIn', (userName, password) => {
    cy.visit("/signin")
    cy.intercept('POST', '/signIn').as('signin');
    cy.get(sign_in_page.input_user_name_field).type(userName)
    cy.get(sign_in_page.input_password_field).type(password)
    cy.get(sign_in_page.sign_in_btn).click()
})

Cypress.Commands.add('signIn', () => {
    cy.visit("/signin")
    cy.intercept('POST', '/signIn').as('signin');
    cy.get(sign_in_page.input_user_name_field).type('test')
    cy.get(sign_in_page.input_password_field).type('password')
    cy.get(sign_in_page.sign_in_btn).click()
})

Cypress.Commands.add('onBoarding', () =>{
    cy.intercept('POST', '/graphql').as('graphql');
    cy.url().should('include', '/');
    cy.get(bank_account_page.next_button).click()
    cy.get(bank_account_page.input_bank_name_field).type('testBank')
    cy.get(bank_account_page.input_routing_number_field).type('111000025')
    cy.get(bank_account_page.input_account_number_field).type('0123456789')
    cy.get(bank_account_page.save_button).click()
    cy.get(bank_account_page.done_button).click()
})

Cypress.Commands.add('logOut', (logIn, password) => {
    cy.intercept('POST', '/logout').as('logout')
    cy.get(bank_account_page.log_out_button).should('be.visible').click()
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
})
