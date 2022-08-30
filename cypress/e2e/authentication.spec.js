import {funcs} from "../Helpers/functions"
import {sign_in_page} from "../Selectors/sign_in_page"
import {sign_up_page} from "../Selectors/sign_up_page"
describe('UI tests for login, signup, and logout actions', () => {

    const firstName = funcs.randomFirstName()
    const lastName = funcs.randomLastName()
    const userName = funcs.randomUsername()
    const password = 'password'

   it('should show "Real World App logo"', () => {
        cy.visit('/')
        cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

       it('should show typeable Username field', () => {
           cy.get(sign_in_page.input_user_name_field).should('be.visible').type('user name')
       })
       it('should show typeable Password field', () => {
           cy.get(sign_in_page.input_password_field).should('be.visible').type('password')
       })
       it('should show Username and Password placeholders', () => {
           cy.get(sign_in_page.password_label).should('be.visible')
           cy.get(sign_in_page.username_label).should('be.visible')
       })
       it('should show Username is required error if user clicks on it and then click outside this field and did not enter any value', ()=> {
           cy.get(sign_in_page.input_user_name_field).clear()
           cy.get(sign_in_page.input_password_field).click()
           cy.get(sign_in_page.user_name_error).should('be.visible')
       })

       it('check "Remember me" checkbox', ()=> {
           cy.get(sign_in_page.remember_me_checkbox).should('not.be.checked').click().should('be.checked')
       })

       it('should show disabled by default sign in btn', ()=> {
           cy.get(sign_in_page.logo_image).click()
           cy.get(sign_in_page.sign_in_btn).should('be.disabled')
       })

       it('should have "Do not have an account?" Sign Up clickable link under Sign in btn', ()=> {
           cy.get(sign_in_page.sign_up_link).should('be.visible').and('have.attr', 'href', '/signup')
       })

       it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", () => {
           cy.get(sign_in_page.cypress_link).should('have.attr', 'href', 'https://cypress.io')
       })

       it('should display login errors while logging with invalid credentials', () => {
           cy.get(sign_in_page.input_user_name_field).type('testuser')
           cy.get(sign_in_page.input_password_field).type('test')
           cy.get(sign_in_page.sign_in_btn).click()
           cy.get(sign_in_page.sign_in_error).should('be.visible').and('have.text', 'Username or password is invalid')
       })

       it('should show an error if the entered password is less than 4 characters', () => {
           cy.get(sign_in_page.input_user_name_field).type('andrey')
           cy.get(sign_in_page.input_password_field).type('abc').blur()
           cy.get(sign_in_page.password_error).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
           cy.get(sign_in_page.input_password_field).type('qwerty').blur()
           cy.get(sign_in_page.password_error).should('not.exist')
       })

       it('should be displayed error message for the First Name', () => {
           cy.visit('/')
           cy.get(sign_in_page.sign_up_link).click()
           cy.url().should('eq', 'http://localhost:3000/signup')
           cy.get(sign_up_page.first_name_error).should('not.exist')
           cy.get(sign_up_page.input_first_name_field).should('be.visible').click().blur()
           cy.get(sign_up_page.sign_up_button).should('be.visible').and('not.be.enabled')
           cy.get(sign_up_page.first_name_error).should('be.visible')
               .and('have.text', 'First Name is required')
       })

       it('should be displayed error message for the Last Name', () => {
           cy.get(sign_up_page.last_name_error).should('not.exist')
           cy.get(sign_up_page.input_last_name_field).should('be.visible').click().blur()
           cy.get(sign_up_page.last_name_error).should('be.visible')
               .and('have.text', 'Last Name is required')
       })

       it('should be displayed error message for the User Name', () => {
           cy.get(sign_up_page.user_name_error).should('not.exist')
           cy.get(sign_up_page.input_user_name_field).should('be.visible').click().blur()
           cy.get(sign_up_page.user_name_error).should('be.visible')
               .and('have.text', 'Username is required')
       })

       it('should be displayed error message for the Password', () => {
           cy.get(sign_up_page.password_error).should('not.exist')
           cy.get(sign_up_page.input_password_field).should('be.visible').click().blur()
           cy.get(sign_up_page.password_error).should('be.visible')
               .and('have.text', 'Enter your password')
           cy.get(sign_up_page.input_password_field).type('qwe').blur()
           cy.get(sign_up_page.password_error).should('be.visible')
               .and('have.text', 'Password must contain at least 4 characters')
           cy.get(sign_up_page.input_password_field).clear()
       })

       it('should be displayed error message for the Confirm Password', () => {
           cy.get(sign_up_page.confirm_password_error).should('not.exist')
           cy.get(sign_up_page.input_confirm_password_field).should('be.visible').click().blur()
           cy.get(sign_up_page.confirm_password_error).should('be.visible')
               .and('have.text', 'Confirm your password')
           cy.get(sign_up_page.input_confirm_password_field).type('qwe').blur()
           cy.get(sign_up_page.confirm_password_error).should('be.visible')
               .and('have.text', 'Password does not match')
           cy.get(sign_up_page.input_confirm_password_field).clear().blur()
           cy.get(sign_up_page.confirm_password_error).should('be.visible')
               .and('have.text', 'Confirm your password')
       })

    it('should allow users to sign up, logIn and logOut', () => {
        cy.signUp(firstName, lastName, userName, password)
        cy.firstLogIn(userName, password)
        cy.onBoarding()
        cy.logOut()
        cy.signIn()
        cy.logOut()
        cy.api_signUp(userName, password)
        cy.api_signIn(userName, password)
        cy.api_logOut().wait("@logout")

    })
})