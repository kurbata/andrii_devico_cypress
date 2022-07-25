const {sign_in_page} = require("../Selectors/sign_in_page");

describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('should show "Real World App logo"', () => {
        cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    // todo: automate foloowing test cases:
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
})