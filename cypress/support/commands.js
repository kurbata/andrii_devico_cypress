const {sign_in_page } = require("../Selectors/sign_in_page")
const {sign_up_page} = require("../Selectors/sign_up_page")
const {bank_account_page} = require("../Selectors/bank_account_page")
const {transaction_page} = require("../Selectors/transaction_page")

const APIurl = 'http://localhost:3001'

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
    })

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
        cy.get(sign_in_page.input_user_name_field).type('andrey_kv')
        cy.get(sign_in_page.input_password_field).type('password')
        cy.get(sign_in_page.sign_in_btn).click()
    })

    Cypress.Commands.add('switchUser', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(bank_account_page.logout_btn).should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
        cy.visit("/signin")
        cy.intercept('POST', '/signIn').as('signin');
        cy.get(sign_in_page.input_user_name_field).type('nata')
        cy.get(sign_in_page.input_password_field).type('password')
        cy.get(sign_in_page.sign_in_btn).click()
    })

    Cypress.Commands.add('api_switchUser', (apiUser, password) => {
        cy.api_logOut()
        cy.visit("/signin")
        cy.api_signIn(apiUser, password)
    })

    Cypress.Commands.add('onBoarding', () => {
        cy.intercept('POST', '/graphql').as('graphql');
        cy.url().should('include', '/');
        cy.get(bank_account_page.next_button).click()
        cy.get(bank_account_page.input_bank_name_field).type('testBank')
        cy.get(bank_account_page.input_routing_number_field).type('111000025')
        cy.get(bank_account_page.input_account_number_field).type('0123456789')
        cy.get(bank_account_page.save_button).click()
        cy.get(bank_account_page.done_button).click()
    })

    Cypress.Commands.add('logOut', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(bank_account_page.logout_btn).should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    Cypress.Commands.add('sendTransaction', (phoneNumber) => {
        cy.get(transaction_page.new_btn).should("be.visible").click()
        cy.get(transaction_page.search).click({force: true}).type(phoneNumber)
        cy.wait('@users')
        cy.get(transaction_page.userList).should('contain.text', phoneNumber).click()
        cy.get(transaction_page.pay_btn).should("be.disabled")
        cy.get(transaction_page.request_btn).should("be.disabled")
        cy.get(transaction_page.amount_fld).click().type("1000")
        cy.get(transaction_page.note_fld).click().type('sale')
        cy.get(transaction_page.request_btn).should("not.be.disabled").click()
        cy.get(transaction_page.return_btn).should("not.be.disabled").click()
    })

    Cypress.Commands.add("sendRequest", (phoneNumber) => {
        cy.get(transaction_page.new_btn).should('be.visible').click()
        cy.get(transaction_page.search).should('be.visible').click({force: true}).type(phoneNumber)
        cy.get(transaction_page.userList).should('be.visible').click()
        cy.get(transaction_page.request_btn).should("be.disabled")
        cy.get(transaction_page.amount_fld).should('be.visible').click().type('1000')
        cy.get(transaction_page.note_fld).should('be.visible').click().type('test_payment')
        cy.get(transaction_page.request_btn).should('be.visible').and('be.enabled').click()
        cy.get(transaction_page.trnsct_popup).should("have.text", "Transaction Submitted!")
        cy.get(transaction_page.return_btn).should('be.visible').click()
    })

    Cypress.Commands.add('likeTransaction', () => {
        cy.get(transaction_page.mine_btn).should('be.visible').click()
        cy.get(transaction_page.transaction_list).should('be.visible').click()
        cy.get(transaction_page.like_count).should('be.visible').and('have.text', '0 ')
        cy.get(transaction_page.like_btn).should('be.visible').and('exist').click()
        cy.get(transaction_page.like_count).should('be.visible').and('have.text', '1 ')
    })

    Cypress.Commands.add('api_signIn', (userName, password) => {
        cy.request('POST', `${APIurl}/login`, {
            username: userName,
            password: password,
        })
    })

    Cypress.Commands.add('api_signUp', (userName, password) => {
        cy.request('POST', `${APIurl}/users`, {
            firstName: 'API',
            lastName: 'User',
            username: userName,
            password: password,
            confirmPassword: password,
        })
    })

    Cypress.Commands.add('api_logOut', () => {
        cy.request('POST', `${APIurl}/logout`)
            .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("create_bank_account_API", (bankName, accountNumber, routingNumber) => {
        cy.request('POST', `${APIurl}/bankAccounts`, {
        bankName: bankName,
        accountNumber: accountNumber,
        routingNumber: routingNumber,
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("delete_bank_account_API(bankAccountId", () => {
        cy.request('DELETE', `${APIurl}/contacts/:bankAccountId`), {
            bankName: bankName,
            accountNumber: accountNumber,
            routingNumber: routingNumber,
        }.then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("delete_bank_account_API(bankAccountId", () => {
        cy.request('DELETE', `${apiUrl}/bankAccounts/${bankAccountId}`)
            .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("add_contact_API", (userId) => {
        cy.request('POST', `${APIurl}/contacts`, {
            contactUserId: userId,
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    Cypress.Commands.add("delete_contact_API", (userId) => {
        cy.request("DELETE", `${APIurl}/contacts/${userId}`)
            .then((response) => {
                expect(response.status).to.eq(200)
            })
    })



