import uuid from "uuid";

const {sign_up_page} = require("../Selectors/sign_up_page")
import {sign_in_page} from "../Selectors/sign_in_page";


describe('UI tests for sign up', () => {

    let uuid = require('uuid')
    let uid = uuid.v4()
    let uniqueId = uid.slice(1, 8);

    before('visiting sign up page', () => {
        cy.visit('/')
        cy.get(sign_in_page.sign_up_link).click()
        cy.url().should('eq', 'http://localhost:3000/signup')
    })

    it('should allow users to sign up', () => {
        cy.intercept("POST", "/users").as("signup")
        const firstName = 'testFirst_' + uniqueId;
        cy.get(sign_up_page.input_first_name_field).type(firstName)
        const lastName = 'testLast_' + uniqueId;
        cy.get(sign_up_page.input_last_name_field).type(lastName)
        const userName = 'testUser_' + uniqueId;
        cy.get(sign_up_page.input_user_name_field).type(userName)
        cy.get(sign_up_page.input_password_field).type('password')
        cy.get(sign_up_page.input_confirm_password_field).type('password')
        cy.get(sign_up_page.sign_up_button).click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })
})