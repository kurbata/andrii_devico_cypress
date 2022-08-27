import {sign_in_page} from "../Selectors/sign_in_page";
import {bank_account_page} from "../Selectors/bank_account_page";
import {rwa_page} from "../Selectors/rwa_page";
describe('UI tests for validation bank accounts page errors', () => {

    before('visiting bank account page', () => {
        cy.visit('/')
        cy.url().should('eq', 'http://localhost:3000/signin')
        cy.signIn()
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.create_bank_account_btn).click()
    })

    it('should validate error messages for the bank name', () => {
        cy.get(bank_account_page.bank_name_error).should('not.exist')
        cy.get(bank_account_page.input_bank_name_field).should('be.visible').click().blur()
        cy.get(bank_account_page.bank_name_error).should('be.visible')
            .and('have.text', 'Enter a bank name')
    })
    it('should validate error messages for the routing number', () => {
        cy.get(bank_account_page.routing_number_error).should('not.exist')
        cy.get(bank_account_page.input_routing_number_field).should('be.visible').click().blur()
        cy.get(bank_account_page.routing_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank routing number')
    })

    it('should validate error messages for the account number', () => {
        cy.get(bank_account_page.account_number_error).should('not.exist')
        cy.get(bank_account_page.input_account_number_field).should('be.visible').click().blur()
        cy.get(bank_account_page.account_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank account number')
    })

    it('should allow the user to logout', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(bank_account_page.log_out_button).should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })
})