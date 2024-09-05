import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is on the home screen', () => {
    cy.visit('/')
})

When('the user enters their credentials', () => {
    cy.get('input[autocomplete="username"]').type('atarm@moveohls.com')
    cy.get('input[autocomplete="current-password"]').type('12345678')
})

When('the user submits the login form', () => {
    cy.get('.amplify-button.amplify-button--primary').contains('Sign in').click()
    cy.wait(2000)
})

Then('the user should be logged in', () => {
    cy.get('[data-cy="user-profile"]').should('be.visible')
})