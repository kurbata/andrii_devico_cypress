import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
describe ("testing something on google", () =>
{
it('I can search something', () => {
    cy.visit('http://localhost:3000/signin');
    /*cy.get("input[title='Search']").type('cypress').type('{enter}')*/
    });
});
