Feature: Pokemon Table
    Background: Pokemon Table Navigation:
        Given the user is on the home screen and logged in

    Scenario: User see a pokemon table
        Then the user should see a list of Pokémon displayed in a table format
        And each table entry should include:
            | Picture     |
            | Name        |
            | ID          |
            | Description |
            | Power Level |
            | HP Level    |

    Scenario: User Searches for a Pokemon
        When the user types "Pikachu" in the search bar
        Then the user should see a list of filtered Pokémon whose names or descriptions include "Pikachu"

    Scenario: User Sorts the Table
        When the user presses the "Sort by" dropdown
        Then the user should see six options:
            | Name A-Z            |
            | Name Z-A            |
            | Power (Low to high) |
            | Power (High to low) |
            | HP (Low to high)    |
            | HP (High to low)    |

        When the user chooses the "<option>" sorting option
        Then the table should be arranged accordingly by "<option>"

        Examples:
            | option              | expectedFirstPokemon |
            | Name A-Z            | Abomasnow            |
            | Power (Low to high) | Chansey              |
            | HP (High to low)    | Blissey              |

    Scenario: User Views Pokemon Details
        When the user clicks on "<pokemon>" Pokémon
        Then the user should see a popup with "<pokemon>" Pokémon details

        When the user clicks 'X'
        Then the user should return to the home screen

        Examples:
            | pokemon   |
            | Bulbasaur |
            | Squirtle  |

    Scenario: User switches displays
        Given the user is on table display
        When the user clicks the cards tab
        Then the user should see the pokemons in cards view

        When the user clicks the table tab
        Then the user should see the pokemons in table view

    Scenario: User initiates a fight from the home screen
        When the user clicks the 'Start a Fight' button
        Then the user should be taken to the 'fight' page