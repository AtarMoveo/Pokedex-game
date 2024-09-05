import { DataTable, Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is logged in and on the fight page", () => {
    cy.visit("/fight")
    cy.get('input[autocomplete="username"]').type('atarm@moveohls.com')
    cy.get('input[autocomplete="current-password"]').type('12345678')
    cy.get('.amplify-button.amplify-button--primary').contains('Sign in').click()
    cy.wait(2000)
    cy.get('[data-cy="user-profile"]').should('be.visible')
})

Then("the user should see a fight button", () => {
    cy.get('[data-cy="start-fight-button"]').should("be.visible")
})

Then("the user should see his pokemon card and his opponent's pokemon card", () => {
    cy.get('[data-cy="user-pokemon-card"]').should("be.visible")
    cy.get('[data-cy="opponent-pokemon-card"]').should("be.visible")
})

Then("each card should include:", (dataTable: DataTable) => {
    const cardElements = dataTable.raw().flat()

    cardElements.forEach((element) => {
        cy.get('[data-cy="user-pokemon-card"]').within(() => {
            cy.get(`[data-cy="pokemon-${element.toLowerCase().replace(' ', '-')}"]`).should("be.visible");
        })

        cy.get('[data-cy="opponent-pokemon-card"]').within(() => {
            cy.get(`[data-cy="pokemon-${element.toLowerCase().replace(' ', '-')}"]`).should("be.visible")
        })
    })
})


When('the user clicks on the pokemons dropdown', () => {
    cy.get('[data-cy="pokemon-dropdown"]').click()
})

Then('the user should see a list of their collected Pokemons in the dropdown', () => {
    cy.get('[data-cy="pokemon-option"]').should('have.length.greaterThan', 0)
})

When('the user selects a specific Pokemon from the dropdown', () => {
    cy.get('[data-cy="pokemon-option"]').contains('Vulpix').click()
})

Then('the user should see the details of the selected Pokemon on the screen', () => {
    cy.get('[data-cy="user-pokemon-card"]').within(() => {
        cy.get('[data-cy="pokemon-name"]').should('contain', 'Vulpix')
        cy.get('[data-cy="pokemon-id"]').should('exist')
        cy.get('[data-cy="pokemon-power-level"]').should('exist')
    })
})
