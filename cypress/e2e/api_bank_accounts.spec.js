describe('API tests for bank accounts actions', () => {

    beforeEach('visiting bank account page', () => {
        cy.clearCookies()
        cy.intercept('POST', '/graphql').as('graphql')
        cy.api_signIn(userName, password)
    })

    const bankName = 'bankName'
    const accountNumber = '0123456789'
    const routingNumber = '111000025'
    const userName = 'test6'
    const password = 'password'
    let userId = "FQeOqgnUp";

    it('should allow user to create bank account (API)', () => {
        cy.create_bank_account_API(bankName, accountNumber, routingNumber)
    })

    it('should allow user to delete bank account (API)', () => {
        cy.delete_bank_account_API
    })

    it("Add contact", () => {
        cy.add_contact_API(userId);
    });

    it("delete_contact",  () =>  {
        cy.delete_contact_API(userId)
    })
})