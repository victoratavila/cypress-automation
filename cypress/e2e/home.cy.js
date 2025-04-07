const acceptedUsernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
const acceptedPassword = 'secret_sauce';


describe('Test if home page loads as expected', () => {

it('Check if itens are found in the home page', () => {

  // Login to homepage
  cy.visit('https://www.saucedemo.com/')

  cy.get('[data-test="username"]')
     .type(acceptedUsernames[0])

  cy.get('[data-test="password"]')
    .type(acceptedPassword)

  cy.get('[data-test="login-button"]')
    .click()

  // Check visibility of itens in the page
  cy.get('[data-test="title"]').contains('Products')
  cy.get('[data-test="inventory-container"]').contains('$')
  cy.get('[data-test="product-sort-container"]').should('be.visible')
  cy.get('.app_logo').should('be.visible')
  cy.get('[data-test="shopping-cart-link"]').should('be.visible')
  cy.get('[id^=react-burger-menu-btn]').should('be.visible')
  cy.get('[id^=react-burger-menu-btn]').click()
  cy.get('[data-test="inventory-sidebar-link"]').should('be.visible')
  cy.get('[data-test="about-sidebar-link"]').should('be.visible')
  cy.get('[data-test="logout-sidebar-link"]').should('be.visible')
  cy.get('[data-test="reset-sidebar-link"]').should('be.visible')
  cy.get('[id^=react-burger-cross-btn]').click()
  cy.get('[data-test="social-twitter"]').should('be.visible')
  cy.get('[data-test="social-facebook"]').should('be.visible')
  cy.get('[data-test="social-linkedin"]').should('be.visible')
  cy.get('[data-test="footer-copy"]').should('be.visible')

  cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  })


  it('Product is correctly loaded, with price, title, description, image, and button to add to cart', () => {

    cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').should('be.visible')
    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('be.visible')
    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]').should('be.visible')
    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').contains('$')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
    cy.xpath("(//button[@id='add-to-cart-sauce-labs-backpack'])[1]").click()
    
    cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', '1');

      cy.get('[data-test="remove-sauce-labs-backpack"]').click()
  
    })

})