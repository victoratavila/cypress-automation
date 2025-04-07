const acceptedUsernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
const acceptedPassword = 'secret_sauce';


describe('Products work as expected', () => {

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

    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    

    })



    it('Test if product can be added to the cart successfully', () => {

      //  Checking if the cart add 1 to the value of items
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('[data-test="shopping-cart-badge"]')
      .should('have.text', '1');
  
    })

    
    it('Test if product can be removed from the cart successfully', () => {

      //  Checking if the cart add 1 to the value of items
      cy.get('[data-test="remove-sauce-labs-backpack"]').click()
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  
  
    })

    it('Test if can click to view full product details', () => {
      cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]').click()
      cy.get('[data-test="item-sauce-labs-backpack-img"]').should('be.visible')
      cy.get('[data-test="inventory-item-name"]').should('be.visible')
      cy.get('[data-test="inventory-item-desc"]').should('be.visible')
      cy.get('[data-test="inventory-item-price"]').should('be.visible')
      cy.get('[data-test="add-to-cart"]').should('be.visible')
      cy.get('[data-test="back-to-products"]').should('be.visible')
      cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    })


    it('Test if product can be added to the cart from the product page', () => {
     cy.get('[data-test="add-to-cart"]').click()
     cy.get('[data-test="shopping-cart-badge"]')
     .should('have.text', '1');
    })


    it('Test if product can be removed of the cart from the product page', () => {
      cy.get('[data-test="remove"]').click()
      cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
     })


     it('Test if all the products can be added simultaneously to the cart', () => {
      cy.get('[data-test="back-to-products"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
      cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
      cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
      cy.get('[data-test="shopping-cart-badge"]')
     .should('have.text', '6');
     })
 
     it('Test if the amount of itens is equal to 3, if 3 products are removed', () => {
      cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
      cy.get('[data-test="remove-sauce-labs-onesie"]').click()
      cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').click()

      cy.get('[data-test="shopping-cart-badge"]')
     .should('have.text', '3');
     })

     it('Test if the amount of items is hidden if cart is empty', () => {
      cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()
      cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
      cy.get('[data-test="remove-sauce-labs-backpack"]').click()

      cy.get('[data-test="shopping-cart-badge"]')
      .should('not.exist')
     })
 
 


 

})