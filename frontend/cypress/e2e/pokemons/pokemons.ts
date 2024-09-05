import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor'
import { SortLabel } from '../../../src/data/types/pokemon'
import { expect } from 'chai'

Given('the user is on the home screen and logged in', () => {
    cy.visit('/')
    cy.get('input[autocomplete="username"]').type('atarm@moveohls.com')
    cy.get('input[autocomplete="current-password"]').type('12345678')
    cy.get('.amplify-button.amplify-button--primary').contains('Sign in').click()
    cy.wait(2000)
    cy.get('[data-cy="user-profile"]').should('be.visible')
})

Then('the user should see a list of Pokémon displayed in a table format', () => {
    cy.get('[data-cy="pokemon-table"]').within(() => {
        cy.get('[data-cy^="pokemon-row-"]').should('have.length.greaterThan', 0)
    })
})

Then('each table entry should include:', (dataTable: DataTable) => {
    const expectedColumns = dataTable.raw().flat()

    cy.get('[data-cy^="pokemon-row-"]').each(($row) => {
        cy.wrap($row).within(() => {
            expectedColumns.forEach((column) => {
                switch (column) {
                    case 'Picture':
                        cy.get('[data-cy^="pokemon-cell-thumbnail-"]').should('be.visible')
                        break
                    case 'Name':
                        cy.get('[data-cy^="pokemon-cell-name-"]').should('not.be.empty')
                        break
                    case 'ID':
                        cy.get('[data-cy^="pokemon-cell-id-"]').should('not.be.empty')
                        break
                    case 'Description':
                        cy.get('[data-cy^="pokemon-cell-description-"]').should('not.be.empty')
                        break
                    case 'Power Level':
                        cy.get('[data-cy^="pokemon-cell-powerLevel-"]').should('not.be.empty')
                        break
                    case 'HP Level':
                        cy.get('[data-cy^="pokemon-cell-hpLevel-"]').should('not.be.empty')
                        break
                    default:
                        throw new Error(`Unknown column: ${column}`)
                }
            })
        })
    })
})


When('the user types {string} in the search bar', (searchTerm: string) => {
    cy.get('[data-cy="search-pokemon-input"]').type(searchTerm)
    cy.wait(1000)
})

Then('the user should see a list of filtered Pokémon whose names or descriptions include {string}', (searchTerm: string) => {
    cy.get('[data-cy^="pokemon-row-"]').each(($row) => {
        cy.wrap($row).within(() => {
            let isMatch = false

            cy.get('[data-cy^="pokemon-cell-name-"]').invoke('text').then((nameText) => {
                if (nameText.toLowerCase().includes(searchTerm.toLowerCase())) {
                    isMatch = true
                }
            })

            cy.get('[data-cy^="pokemon-cell-description-"]').invoke('text').then((descText) => {
                if (descText.toLowerCase().includes(searchTerm.toLowerCase())) {
                    isMatch = true
                }
            }).then(() => {
                expect(isMatch).to.be.true
            })
        })
    })
})

// Then('the user should see an empty table if no Pokémon match the search term', () => {
//     cy.get('[data-cy^="pokemon-row-"]').should('have.length', 0)
// })



When('the user presses the "Sort by" dropdown', () => {
    cy.get('[data-cy="sort-by-dropdown"]').click()
})

Then('the user should see six options:', () => {
    const expectedOptions = [
        SortLabel.NameAsc,
        SortLabel.NameDesc,
        SortLabel.PowerAsc,
        SortLabel.PowerDesc,
        SortLabel.HPAsc,
        SortLabel.HPDesc,
    ]

    expectedOptions.forEach(option => {
        cy.get(`[data-cy="sort-by-option-${option}"]`).should('exist')
    })
})

When('the user chooses the {string} sorting option', (option: string) => {
    cy.get('[data-cy="sort-by-dropdown"]').type(option)
    cy.get(`[data-cy="sort-by-option-${option}"]`).should('be.visible').click()
})

Then('the table should be arranged accordingly by {string}', (option: string) => {
    const expectedFirstPokemon = getExpectedFirstPokemon(option)

    cy.get('[data-cy^="pokemon-row-"]').first().within(() => {
        cy.get('[data-cy^="pokemon-cell-name-"]').invoke('text').then((nameText) => {
            expect(nameText.trim()).to.equal(expectedFirstPokemon)
        })
    })
})

function getExpectedFirstPokemon(option: string): string {
    switch (option) {
        case SortLabel.NameAsc:
            return 'Abomasnow'
        case SortLabel.PowerAsc:
            return 'Chansey'
        case SortLabel.HPDesc:
            return 'Blissey'
        default:
            throw new Error(`Unknown sorting option: ${option}`)
    }
}

When('the user clicks on {string} Pokémon', (pokemon: string) => {
    cy.log(pokemon)
    cy.log(`[data-cy="pokemon-row-${pokemon}"]`)
    cy.get(`[data-cy="pokemon-row-${pokemon}"]`).click()
})

Then('the user should see a popup with {string} Pokémon details', (pokemon: string) => {
    cy.get(`[data-cy="pokemon-popup"]`).should('be.visible')
    cy.get(`[data-cy="pokemon-popup-title"]`).should('have.text', pokemon)
})

When("the user clicks 'X'", () => {
    cy.get(`[data-cy="pokemon-popup-close"]`).click()
})

Then('the user should return to the home screen', () => {
    cy.get(`[data-cy="all-pokemons-container"]`).should('be.visible')
})

Given('the user is on table display', () => {
    cy.get('[data-cy="pokemon-table"]').should('be.visible')
})

When('the user clicks the cards tab', () => {
    cy.get('[data-cy="Cards-tab"]').should('be.visible').click()
})

Then('the user should see the pokemons in cards view', () => {
    cy.get('[data-cy="cards-view-cmp"]').should('be.visible')
})

When('the user clicks the table tab', () => {
    cy.get('[data-cy="List-tab"]').click()
})

Then('the user should see the pokemons in table view', () => {
    cy.get('[data-cy="pokemon-table"]').should('be.visible')
})

When('the user clicks the \'Start a Fight\' button', () => {
    cy.get('[data-cy="start-fight-button"]').click()
})

Then('the user should be taken to the \'fight\' page', () => {
    cy.url().should('include', '/fight')
    cy.get('[data-cy="fight-page"]').should('be.visible')
})