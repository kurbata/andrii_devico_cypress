import {transaction_page} from "../Selectors/transaction_page"
describe('Verify transactions flow', () => {

    beforeEach('Visit page, login, intecept requests', () => {
        cy.visit('/')
        cy.intercept('GET', '/users').as('users')
        cy.intercept('POST', '/transactions').as('transact')
        cy.intercept('GET', '/transactions/*').as('transactions')
        cy.intercept('GET', '/checkAuth').as('auth')
        cy.intercept('GET', '/users/search*').as('search')
        cy.signIn()
    })

     it("Should allow to search user and send a pay request", () => {
        cy.get(transaction_page.new_btn).should('be.visible').click()
        cy.get(transaction_page.search).should('be.visible').click({force: true}).type('nata nata')
        cy.get(transaction_page.userList).should('be.visible').click()
        cy.get(transaction_page.pay_btn).should("be.disabled")
        cy.get(transaction_page.amount_fld).should('be.visible').click().type('1000')
        cy.get(transaction_page.note_fld).should('be.visible').click().type('test_payment')
        cy.get(transaction_page.pay_btn).should('be.visible').and('be.enabled').click()
        cy.get(transaction_page.trnsct_popup).should("have.text", "Transaction Submitted!")
        cy.get(transaction_page.return_btn).should('be.visible').click()
    })

    it("Should allow to search user and send a transaction request", () => {
        cy.get(transaction_page.new_btn).should("be.visible").click()
        cy.get(transaction_page.search).click({force:true}).type('nata nata')
        cy.get(transaction_page.userList).click()
        cy.get(transaction_page.pay_btn).should("be.disabled")
        cy.get(transaction_page.request_btn).should("be.disabled")
        cy.get(transaction_page.amount_fld).type("1")
        cy.get(transaction_page.note_fld).type("test")
        cy.get(transaction_page.pay_btn).should("not.be.disabled")
        cy.get(transaction_page.request_btn).should("not.be.disabled").click()
        cy.get(transaction_page.trnsct_popup).should("be.visible").and("have.text",
            "Transaction Submitted!")
    })

    it("Should allow to search user, submits a transaction payment and verifies the deposit for the receiver",
        () => {
            let startBalance
            let endBalance
            cy.get(transaction_page.balance).should("be.visible").invoke("text")
                .then((balance_value) => {
                    const dollarTrim = balance_value.slice(1)
                    const dotRemove = dollarTrim.length > 10 ? dollarTrim.replace(/,/, "") : dollarTrim
                    const stringToNumber = parseFloat(dotRemove)
                    startBalance = stringToNumber
                    return startBalance
                })
            cy.switchUser()
            cy.get(transaction_page.new_btn).should("be.visible").click()
            cy.get(transaction_page.search).click({force:true}).type("andrey_kv")
            cy.get(transaction_page.userList).click()
            cy.get(transaction_page.pay_btn).should("be.disabled")
            cy.get(transaction_page.request_btn).should("be.disabled")
            cy.get(transaction_page.amount_fld).type("1000")
            cy.get(transaction_page.note_fld).type('for sale')
            cy.get(transaction_page.request_btn).should("not.be.disabled")
            cy.get(transaction_page.pay_btn).should("not.be.disabled").click()
            cy.get(transaction_page.trnsct_popup).should("be.visible")
            cy.get(transaction_page.trnsct_popup).should("have.text", "Transaction Submitted!")
            cy.switchUser()
            cy.get(transaction_page.balance).should("be.visible").invoke("text")
                .then((balance_value) => {
                    const dollarTrim = balance_value.slice(1)
                    const dotRemove =
                        dollarTrim.length > 10 ? dollarTrim.replace(/,/, "") : dollarTrim
                    const stringToNumber = parseFloat(dotRemove)
                    startBalance = stringToNumber
                    return endBalance
                    expect(endBalance).to.eql(startBalance + 100)
                })
        })

    it('Should be possible to apply a payment request ', () => {
        cy.get(transaction_page.new_btn).should("be.visible").click()
        cy.get(transaction_page.search).click({force:true}).type("nata nata")
        cy.get(transaction_page.userList).click()
        cy.get(transaction_page.pay_btn).should("be.disabled")
        cy.get(transaction_page.request_btn).should("be.disabled")
        cy.get(transaction_page.amount_fld).click().type("1000")
        cy.get(transaction_page.note_fld).click().type('sale')
        cy.get(transaction_page.request_btn).should("not.be.disabled").click()
        cy.get(transaction_page.return_btn).should("not.be.disabled").click()
        cy.switchUser()
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').click()
        cy.get(transaction_page.accept_request_btn).should('be.visible').click()
        cy.get(transaction_page.accept_request_btn).should('not.exist')
    })

    it('Should be possible to search for a user by attribute', () => {
        cy.get(transaction_page.new_btn).should('be.visible').click()
        cy.wait('@users')
        cy.get(transaction_page.search).should('be.visible').click({force: true}).type('nata')
        cy.get(transaction_page.userList).should('be.visible').contains('nata nata')
    })

    it("displays transaction errors", () => {
        cy.get(transaction_page.new_btn).should("be.visible").click()
        cy.get(transaction_page.search).click({force: true}).type('1111')
        cy.get(transaction_page.userList).click()
        cy.get(transaction_page.pay_btn).should("be.disabled")
        cy.get(transaction_page.request_btn).should("be.disabled")
        cy.get(transaction_page.note_fld).click()
        cy.get(transaction_page.amount_error).should("have.text","Please enter a valid amount")
        cy.get(transaction_page.amount_fld).click()
        cy.get(transaction_page.note_error).should("have.text", "Please enter a note")
    })
})