import{user_settings_page} from "../Selectors/user_settings_page";
describe("User Settings", () => {

    beforeEach('update a user',() => {
        cy.firstLogIn(userName, password)
        cy.get(user_settings_page.my_account_btn).click()
        cy.url().should("contain", "/user/settings");
        cy.intercept("PATCH", "/users/*").as("updateUser");
    })

    const userName = 'test6'
    const password = 'password'

    it("Should render the user settings form", () => {
        cy.get(user_settings_page.first_name_input).should('be.visible').and('exist')
        cy.get(user_settings_page.last_name_input).should('be.visible').and('exist')
        cy.get(user_settings_page.email_input).should('be.visible').and('exist')
        cy.get(user_settings_page.phone_number_input).should('be.visible').and('exist')
        cy.get(user_settings_page.save_btn).should('be.visible').and('exist')
    })

    it("Should display user setting form errors", () => {
        cy.get(user_settings_page.first_name_input).should('be.visible').and('exist')
            .click().clear()
        cy.get(user_settings_page.last_name_input).should('be.visible').and('exist')
            .click().clear()
        cy.get(user_settings_page.email_input).should('be.visible').and('exist')
            .click().clear()
        cy.get(user_settings_page.phone_number_input).should('be.visible').and('exist')
            .click().clear()
        cy.get(user_settings_page.first_name_error).should('be.visible').and('exist')
            .and("contain", "Enter a first name");
        cy.get(user_settings_page.last_name_error).should('be.visible').and('exist')
            .and("contain", "Enter a last name");
        cy.get(user_settings_page.email_error).should('be.visible').and('exist')
            .and("contain", "Enter an email address");
        cy.get(user_settings_page.phone_number_error).should('be.visible').and('exist')
            .and("contain", "Enter a phone number");
        cy.get(user_settings_page.save_btn).should('be.visible').and('exist').and('be.disabled')
    })
    it("User should be able to update all settings in once", () => {
        cy.get(user_settings_page.first_name_input).click().clear().type('firstName')
        cy.get(user_settings_page.last_name_input).click().clear().type('lastName')
        cy.get(user_settings_page.email_input).click().clear().type('test@email.com')
        cy.get(user_settings_page.phone_number_input).click().clear().type('322321')
        cy.get(user_settings_page.save_btn).should('be.visible').click().wait("@updateUser")
            .its("response.statusCode").should("eq", 204)
    })

    it("User should be able to update first name", () => {
        cy.get(user_settings_page.first_name_input).click().clear().type(userName)
        cy.get(user_settings_page.save_btn).should('be.visible').click().wait("@updateUser")
            .its("response.statusCode").should("eq", 204)
    })

    it("User should be able to update last name", () => {
        cy.get(user_settings_page.last_name_input).click().clear().type(userName)
        cy.get(user_settings_page.save_btn).should('be.visible').click().wait("@updateUser")
            .its("response.statusCode").should("eq", 204)
    })

    it("User should be able to update email", () => {
        cy.get(user_settings_page.email_input).click().clear().type('test6@email.com')
        cy.get(user_settings_page.save_btn).should('be.visible').click().wait("@updateUser")
            .its("response.statusCode").should("eq", 204)
    })

    it("User should be able to update phone number", () => {
        cy.get(user_settings_page.phone_number_input).click().clear().type('322322')
        cy.get(user_settings_page.save_btn).should('be.visible').click().wait("@updateUser")
            .its("response.statusCode").should("eq", 204)
    })
})
