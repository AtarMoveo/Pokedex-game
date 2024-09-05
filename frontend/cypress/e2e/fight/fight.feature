Feature: Engage in Pokemon Battles
    Background: Fight Page Navigation
        Given the user is logged in and on the fight page

    Scenario: User Should be able to start a fight
        Then the user should see a fight button
        And the user should see his pokemon card and his opponent's pokemon card
        And each card should include:
            | Picture     |
            | ID   |
            | Power Level |
            | Name        |

  Scenario: User switches Pokemon
    When the user clicks on the pokemons dropdown
    Then the user should see a list of their collected Pokemons in the dropdown

    When the user selects a specific Pokemon from the dropdown
    Then the user should see the details of the selected Pokemon on the screen
