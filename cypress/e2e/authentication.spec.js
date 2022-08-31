import {funcs} from "../Helpers/functions";
describe('UI tests for signup, login and logout actions', () => {

    const firstName = funcs.randomFirstName();
    const lastName = funcs.randomLastName()
    const userName = funcs.randomUsername()
    const password = 'password'

    beforeEach('visiting sign up page', () => {
        cy.clearCookies()
    })

    it('should allow users to sign up, logIn and logOut', () => {
        cy.signUp(firstName, lastName, userName, password)
        cy.firstLogIn(userName, password)
        cy.onBoarding()
        cy.logOut()
        cy.signIn()
        cy.logOut()
    })
})