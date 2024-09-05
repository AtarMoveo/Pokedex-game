@login
Feature: Loging in

    Scenario: User loges in to all pokemons page
        Given the user is on the home screen
        When the user enters their credentials
        When the user submits the login form
        Then the user should be logged in