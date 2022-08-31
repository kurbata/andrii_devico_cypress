import {sign_in_page} from "../Selectors/sign_in_page";
import {real_world_page} from "../Selectors/real_world_page";

describe('UI tests for LogIn and logout', () => {

    before('visiting sign up page', () => {
        cy.visit('/')
        cy.url().should('eq', 'http://localhost:3000/signin')
        cy.reload()
    })

    it('should allow users to signin', () => {
        cy.intercept('POST', '/login').as('signin')
        cy.get(sign_in_page.input_user_name_field).type('test6')
        cy.get(sign_in_page.input_password_field).type('password')
        cy.get(sign_in_page.sign_in_btn).click()
        cy.url().should('eq', 'http://localhost:3000/signin')
        cy.get(real_world_page.next_button).click()
    })

    it('should validate error messages for the bank name', () => {
        cy.get(real_world_page.bank_name_error).should('not.exist')
        cy.get(real_world_page.input_bank_name_field).should('be.visible').click().blur()
        cy.get(real_world_page.bank_name_error).should('be.visible')
            .and('have.text', 'Enter a bank name')
    })
    it('should validate error messages for the routing number', () => {
        cy.get(real_world_page.routing_number_error).should('not.exist')
        cy.get(real_world_page.input_routing_number_field).should('be.visible').click().blur()
        cy.get(real_world_page.routing_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank routing number')
    })

    it('should validate error messages for the account number', () => {
        cy.get(real_world_page.account_number_error).should('not.exist')
        cy.get(real_world_page.input_account_number_field).should('be.visible').click().blur()
        cy.get(real_world_page.account_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank account number')
    })

    it('should allow the user to complete the login action with valid bank data', () => {
        cy.get(real_world_page.input_bank_name_field).type('testBank')
        cy.get(real_world_page.input_routing_number_field).type('111000025')
        cy.get(real_world_page.input_account_number_field).type('0123456789')
        cy.get(real_world_page.save_button).click()
        cy.get(real_world_page.done_button).click()
    })

    it('should allow the user to logout', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(real_world_page.log_out_button).should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })
})