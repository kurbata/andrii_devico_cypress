import {transaction_page} from "../Selectors/transaction_page";

it("displays transaction errors", () => {
    cy.signIn()
    cy.get(transaction_page.new_btn).should("be.visible").click()
    cy.get(transaction_page.search).click({force: true}).type('test6')
    cy.get(transaction_page.userList).click({force: true})
    cy.get(transaction_page.pay_btn).should("be.disabled")
    cy.get(transaction_page.request_btn).should("be.disabled")
    cy.get(transaction_page.note_fld).click()
    cy.get(transaction_page.amount_error).should("have.text","Please enter a valid amount")
    cy.get(transaction_page.amount_fld).click()
    cy.get(transaction_page.note_error).should("have.text", "Please enter a note")
});