import {sign_up_page} from "../Selectors/sign_up_page";
import {sign_in_page} from "../Selectors/sign_in_page";

before('visiting sign up page', () => {
    cy.visit('/')
    cy.get(sign_in_page.sign_up_link).click()
    cy.url().should('eq', 'http://localhost:3000/signup')
})

it('should be displayed error message for the First Name', () => {
    cy.get(sign_up_page.first_name_error).should('not.exist')
    cy.get(sign_up_page.input_first_name_field).should('be.visible').click().blur()
    cy.get(sign_up_page.sign_up_button).should('be.visible').and('not.be.enabled')
    cy.get(sign_up_page.first_name_error).should('be.visible').and('have.text', 'First Name is required')
})

it('should be displayed error message for the Last Name', () => {
    cy.get(sign_up_page.last_name_error).should('not.exist')
    cy.get(sign_up_page.input_last_name_field).should('be.visible').click().blur()
    cy.get(sign_up_page.last_name_error).should('be.visible').and('have.text', 'Last Name is required')
})

it('should be displayed error message for the User Name', () => {
    cy.get(sign_up_page.user_name_error).should('not.exist')
    cy.get(sign_up_page.input_user_name_field).should('be.visible').click().blur()
    cy.get(sign_up_page.user_name_error).should('be.visible').and('have.text', 'Username is required')
})

it('should be displayed error message for the Password', () => {
    cy.get(sign_up_page.password_error).should('not.exist')
    cy.get(sign_up_page.input_password_field).should('be.visible').click().blur()
    cy.get(sign_up_page.password_error).should('be.visible').and('have.text', 'Enter your password')
    cy.get(sign_up_page.input_password_field).type('qwe').blur()
    cy.get(sign_up_page.password_error).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
    cy.get(sign_up_page.input_password_field).clear()
})

it('should be displayed error message for the Confirm Password', () => {
    cy.get(sign_up_page.confirm_password_error).should('not.exist')
    cy.get(sign_up_page.input_confirm_password_field).should('be.visible').click().blur()
    cy.get(sign_up_page.confirm_password_error).should('be.visible').and('have.text', 'Confirm your password')
    cy.get(sign_up_page.input_confirm_password_field).type('qwe').blur()
    cy.get(sign_up_page.confirm_password_error).should('be.visible').and('have.text', 'Password does not match')
    cy.get(sign_up_page.input_confirm_password_field).clear().blur()
    cy.get(sign_up_page.confirm_password_error).should('be.visible').and('have.text', 'Confirm your password')
})