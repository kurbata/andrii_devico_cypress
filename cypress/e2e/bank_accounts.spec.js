import {bank_account_page} from "../Selectors/bank_account_page"
import {rwa_page} from "../Selectors/rwa_page"
import {sign_in_page} from "../Selectors/sign_in_page"
describe('UI tests for bank accounts actions', () => {

    beforeEach('visiting bank account page', () => {
        cy.clearCookies()
        cy.signIn()
        cy.intercept('POST', '/graphql').as('graphql')
    })

    it('should allow user to create new bank account', () => {
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.create_bank_account_btn).click()
        cy.get(bank_account_page.input_bank_name_field).type('test_bank_account')
        cy.get(bank_account_page.input_routing_number_field).type('111000025')
        cy.get(bank_account_page.input_account_number_field).type('0123456789')
        cy.get(rwa_page.save_btn).click()
        cy.logOut()
    })

    it('should allow user to delete bank account', () => {
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.delete_bank_account_btn).first().click()
        cy.get(rwa_page.bank_account_list).children().contains("Deleted")
        cy.logOut()
   })

    it('should validate error messages for the bank name', () => {
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.create_bank_account_btn).click()
        cy.get(bank_account_page.bank_name_error).should('not.exist')
        cy.get(bank_account_page.input_bank_name_field).should('be.visible').click().blur()
        cy.get(bank_account_page.bank_name_error).should('be.visible')
            .and('have.text', 'Enter a bank name')
    })
    it('should validate error messages for the routing number', () => {
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.create_bank_account_btn).click()
        cy.get(bank_account_page.routing_number_error).should('not.exist')
        cy.get(bank_account_page.input_routing_number_field).should('be.visible').click().blur()
        cy.get(bank_account_page.routing_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank routing number')
    })

    it('should validate error messages for the account number', () => {
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.get(rwa_page.create_bank_account_btn).click()
        cy.get(bank_account_page.account_number_error).should('not.exist')
        cy.get(bank_account_page.input_account_number_field).should('be.visible').click().blur()
        cy.get(bank_account_page.account_number_error).should('be.visible')
            .and('have.text', 'Enter a valid bank account number')
    })

    it('should allow the user to logout', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(bank_account_page.logout_btn).should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })
})