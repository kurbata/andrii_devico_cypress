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

    const commentText = 'thank you'
    const phoneNumber = '666666'

    it("transactions navigation tabs should be hidden on a transaction view page",
        () => {
            cy.get(transaction_page.trnsct_view_tabs).should('be.visible').and('exist')
            cy.get(transaction_page.mine_btn).should('be.visible').click()
            cy.get(transaction_page.transaction_list).should('be.visible').click()
            cy.get(transaction_page.trnsct_view_tabs).should('not.exist')
        })

    it("User should be able to like a transaction", () => {
        cy.sendTransaction(phoneNumber)
        cy.switchUser()
        cy.likeTransaction()
     } )

    it("User should be able to comment on a transaction", () => {
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').click()
        cy.get(transaction_page.trnsct_comment_input).type(commentText + '{enter}')
        cy.get(transaction_page.comment_list)
            .children()
            .should('contain.text',commentText)
    })

    it("User should be able to accept a transaction request", () => {
        cy.sendRequest(phoneNumber)
        cy.switchUser()
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').first().click()
        cy.get(transaction_page.accept_request_btn).should('be.enabled').click()
    })

    it("User should be able to reject a transaction request", () => {
        cy.sendRequest(phoneNumber)
        cy.switchUser()
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').first().click()
        cy.get(transaction_page.rjct_rqst).should('be.enabled').click()
    })

    it("Accept/reject buttons shouldn't exist on completed request", () => {
        cy.sendRequest(phoneNumber)
        cy.switchUser()
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').first().click()
        cy.get(transaction_page.rjct_rqst).should('be.enabled').click()
        cy.get(transaction_page.rjct_rqst).should('not.exist')
        cy.get(transaction_page.accept_request_btn).should('not.exist')
    })
})

