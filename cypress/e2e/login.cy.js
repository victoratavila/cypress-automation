const acceptedUsernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
const acceptedPassword = 'secret_sauce';

describe('Checks if login form is working', () => {
  it('Access the login page', () => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('Check if login fails with incorrect credentials', () => {
  cy.get('[data-test="username"]')
    .type('Non existing user')

  cy.get('[data-test="password"]')
    .type('Incorrect password')

  cy.get('[data-test="login-button"]')
    .click()

  cy.get('[data-test="username"]')
    .clear()

  cy.get('[data-test="password"]')
    .clear()

  cy.url().should('eq', 'https://www.saucedemo.com/') 
  cy.get('.error-message-container').should('be.visible')
    
  })

  // it('Check if accepted usernames are visible', () => {

  //   cy.get('[data-test="login-credentials"]')
  //     .contains('Accepted usernames are')
  //   cy.get('[data-test="login-credentials"]')
  //     .contains(acceptedUsernames.join(''))
  //   })



it('Check if login fails if the username is right but password is incorrect', () => {

  cy.get('[data-test="username"]')
     .type(acceptedPassword)

  cy.get('[data-test="password"]')
    .type('cypress@123')

  cy.get('[data-test="login-button"]')
    .click()

  cy.get('.error-message-container').should('be.visible')
  cy.get('[data-test="error"]').contains('Username and password do not match')

  cy.get('[data-test="username"]')
    .clear()

  cy.get('[data-test="password"]')
    .clear()

})

it('Check if login fails if the password is right but username is incorrect', () => {

  cy.get('[data-test="username"]')
     .type(acceptedUsernames[0])

  cy.get('[data-test="password"]')
    .type('cypress@123')

  cy.get('[data-test="login-button"]')
    .click()

  cy.get('.error-message-container').should('be.visible')
  cy.get('[data-test="error"]').contains('Username and password do not match')

  cy.get('[data-test="username"]')
  .clear()

cy.get('[data-test="password"]')
  .clear()

})

it('Check if login fails if some of the password field is empty', () => {

  
//Missing password 
  cy.get('[data-test="username"]')
     .type(acceptedUsernames[0])

  cy.get('[data-test="login-button"]')
    .click()

  cy.get('.error-message-container').should('be.visible')
  cy.get('[data-test="error"]').contains('Password is required')

  cy.get('[data-test="username"]')
  .clear()

cy.get('[data-test="password"]')
  .clear()

})

it('Check if login fails if some of the username field is empty', () => {

  
  //Missing username
    cy.get('[data-test="password"]')
    .type('cypress@123')

    cy.get('[data-test="login-button"]')
      .click()
  
    cy.get('.error-message-container').should('be.visible')
    cy.get('[data-test="error"]').contains('Username is required')
  
    cy.get('[data-test="username"]')
    .clear()
  
  cy.get('[data-test="password"]')
    .clear()
  
  })

  it('Check if login fails if both field are empty', () => {

  
    //Missing username
  
      cy.get('[data-test="login-button"]')
        .click()
    
      cy.get('.error-message-container').should('be.visible')
      cy.get('[data-test="error"]').contains('is required')
    
      cy.get('[data-test="username"]')
      .clear()
    
    cy.get('[data-test="password"]')
      .clear()
    
    })

it('Check if login works with accepted username and accepted password', () => {

  cy.get('[data-test="username"]')
     .type(acceptedUsernames[0])

  cy.get('[data-test="password"]')
    .type(acceptedPassword)

  cy.get('[data-test="login-button"]')
    .click()

    cy.get('[data-test="title"]').contains('Products')
    cy.get('[data-test="inventory-container"]').contains('$')

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

    cy.get('[id^=react-burger-menu-btn]').click()
    cy.get('[data-test="logout-sidebar-link"]').click()

})




  
        


  
    



})