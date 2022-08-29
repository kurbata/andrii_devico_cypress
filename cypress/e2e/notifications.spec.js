import {transaction_page} from "../Selectors/transaction_page"
import{funcs} from "../Helpers/functions"
describe('Verify transactions flow', () => {

    beforeEach('Visit page, login, intecept requests', () => {
        cy.visit('/')
        cy.intercept('GET', '/users').as('users')
        cy.intercept('POST', '/transactions').as('transact')
        cy.intercept('GET', '/transactions/*').as('transactions')
        cy.intercept('GET', '/checkAuth').as('auth')
        cy.intercept('GET', '/users/search*').as('search')
    })

    const password = 'password'
    const phoneNumberA = '111111'
    const phoneNumberB = '333333'
    const phoneNumberC = '444444'

     it("When user A likes a transaction of user B, user B should get notification that user A liked transaction",
        () => {
        cy.firstLogIn(funcs.userB(), password)
        cy.sendTransaction(phoneNumberA)
        cy.sendTransaction(phoneNumberC)
        cy.logOut()
        cy.firstLogIn(funcs.userA(), password)
        cy.likeTransaction()
        cy.logOut()
        cy.firstLogIn(funcs.userB(), password)
        cy.get(transaction_page.notification_icon).click()
        cy.get(transaction_page.notifications_list).should('contain.text.text',
            "userA userA liked a transaction.")
    })

    it("When user C likes a transaction between user A and user B, user A and user B should get notifications " +
        "that user C liked transaction",
        () => {
            cy.firstLogIn(funcs.userA(), password)
            cy.sendTransaction(phoneNumberC)
            cy.logOut()
            cy.firstLogIn(funcs.userC(), password)
            cy.likeTransaction()
            cy.logOut()
            cy.firstLogIn(funcs.userB(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userC userC liked a transaction.")
            cy.logOut()
            cy.firstLogIn(funcs.userA(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userC userC liked a transaction.")
            cy.logOut()
            cy.firstLogIn(funcs.userB(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userC userC liked a transaction.")
        })

    it("When user A comments on a transaction of user B, user B should get notification that " +
        "User A commented on their transaction",
        () => {
            cy.firstLogIn(funcs.userB(), password)
            cy.sendTransaction(phoneNumberA)
            cy.logOut()
            cy.firstLogIn(funcs.userA(), password)
            cy.get(transaction_page.mine_btn).click()
            cy.get(transaction_page.transaction_list).click()
            cy.get(transaction_page.trnsct_comment_input).type('thank you{enter}')
            cy.logOut()
            cy.firstLogIn(funcs.userB(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userA userA commented on a transaction.")
        })

    it("When user C comments on a transaction between user A and user B, user A and B should get " +
        "notifications that user C commented on their transaction",
        () => {
            cy.firstLogIn(funcs.userB(), password)
            cy.sendTransaction(phoneNumberC)
            cy.logOut()
            cy.firstLogIn(funcs.userC(), password)
            cy.get(transaction_page.mine_btn).click()
            cy.get(transaction_page.transaction_list).click()
            cy.get(transaction_page.trnsct_comment_input).type('thank you{enter}')
            cy.logOut()
            cy.firstLogIn(funcs.userB(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userC userC commented on a transaction.")
            cy.logOut()
            cy.firstLogIn(funcs.userA(), password)
            cy.sendTransaction(phoneNumberC)
            cy.logOut()
            cy.firstLogIn(funcs.userC(), password)
            cy.get(transaction_page.mine_btn).click()
            cy.get(transaction_page.transaction_list).click()
            cy.get(transaction_page.trnsct_comment_input).type('thank you{enter}')
            cy.logOut()
            cy.firstLogIn(funcs.userA(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userC userC commented on a transaction.")
        })

    it("When user A sends a payment to user B, user B should be notified of payment",
        () => {
            cy.firstLogIn(funcs.userA(), password)
            cy.sendTransaction(phoneNumberB)
            cy.logOut()
            cy.firstLogIn(funcs.userB(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userA userA requested payment.")
        })
    it("When user A sends a payment request to user C, user C should be notified of request from user A",
        () => {
            cy.firstLogIn(funcs.userA(), password)
            cy.sendTransaction(phoneNumberC)
            cy.logOut()
            cy.firstLogIn(funcs.userC(), password)
            cy.get(transaction_page.notification_icon).click()
            cy.get(transaction_page.notifications_list).should('contain.text',
                "userA userA requested payment.")
        })
})