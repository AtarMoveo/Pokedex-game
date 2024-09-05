// const loginToCognito = (username: string, password: string) => {
//     Cypress.log({
//       displayName: 'COGNITO LOGIN',
//       message: [`🔐 Authenticating | ${username}`],
//       autoEnd: false,
//     })
  
//     cy.visit('/')
  
//     cy.origin(
//       Cypress.env('cognito_domain'),
//       {
//         args: {
//           username,
//           password,
//         },
//       },
//       ({ username, password }) => {
//         cy.contains('Sign in')
//         cy.get('input[name="username"]:visible').type(username)
//         cy.get('input[name="password"]:visible').type(password, {
//           log: false,
//         })
//         cy.get('input[name="signInSubmitButton"]:visible').click()
//       }
//     )
  
//     cy.wait(2000)
  
//     cy.contains('All Pokemons').should('be.visible')
//   }
  
//   Cypress.Commands.add(
//     'loginByCognito',
//     () => {
//         const username = Cypress.env('cognito_username')
//         const password = Cypress.env('cognito_password')
//       cy.session(
//         `cognito-${username}`,
//         () => {
//           return loginToCognito(username, password)
//         },
//         {
//           validate() {
//             cy.visit('/')
//             cy.contains('All Pokemons').should('be.visible')
//           },
//         }
//       )
//     }
//   )
  
  