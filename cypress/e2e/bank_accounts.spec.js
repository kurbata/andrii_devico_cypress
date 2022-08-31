import {bank_account_page} from "../Selectors/bank_account_page";
import {rwa_page} from "../Selectors/rwa_page";
describe('UI tests for bank accounts actions', () => {

    beforeEach('visiting bank account page', () => {
        cy.clearCookies();
        cy.signIn()
        cy.get(rwa_page.bank_accounts_btn).click()
        cy.intercept('POST', '/graphql').as('graphql');
    })

    it('should allow user to create new bank account', () => {
        cy.get(rwa_page.create_bank_account_btn).click()
        cy.get(bank_account_page.input_bank_name_field).type('test_bank_account')
        cy.get(bank_account_page.input_routing_number_field).type('111000025')
        cy.get(bank_account_page.input_account_number_field).type('0123456789')
        cy.get(rwa_page.save_btn).click()
        cy.logOut()
    })

    it('should allow user to delete bank account', () => {
        cy.get(rwa_page.delete_bank_account_btn).first().click()
        cy.get(rwa_page.bank_account_list).children().contains("Deleted");
        cy.logOut()
   })
})