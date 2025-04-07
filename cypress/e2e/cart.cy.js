const acceptedUsernames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
const acceptedPassword = 'secret_sauce';

const testedProductTitle = 'Sauce Labs Backpack'
const testedProductDescription = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
const testedProductPrice = '$29.99'
const tax = '$2.40'
const totalPrice = '$32.39'

describe('Test if the cart feature works as expected', () => {

  it('Product is added and removed correctly inside of the cart', () => {
    // Login to homepage
  cy.visit('https://www.saucedemo.com/')

  cy.get('[data-test="username"]')
     .type(acceptedUsernames[0])

  cy.get('[data-test="password"]')
    .type(acceptedPassword)

  cy.get('[data-test="login-button"]')
    .click()

  let productTitle;
  let productDescription;
  let productPrice;

  cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').then(proName => {

    //Storing in the variable the product title
    productTitle = proName.text().trim()

    //Storing in the variable the product description
    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]').then(proDescription => {
      productDescription = proDescription.text().trim()

    //Storing in the variable the product price
      cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').then(ProPrice => {
        productPrice = ProPrice.text().trim()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
      
        cy.get('[data-test="inventory-item-name"]').should(TitleInTheCart => {
          expect(TitleInTheCart.text().trim()).to.equal(productTitle);
        });

        cy.get('[data-test="inventory-item-desc"]').should(DescriptionInTheCart => {
          expect(DescriptionInTheCart.text().trim()).to.equal(productDescription);
        });
  
        cy.get('[data-test="inventory-item-price"]').should(PriceInTheCart => {
          expect(PriceInTheCart.text().trim()).to.equal(productPrice);
        });

        cy.get('[data-test="item-quantity"]').should(itemsAmount => {
          expect(itemsAmount.text().trim()).to.equal('1')
        })

        cy.get('[data-test="shopping-cart-badge"]')
       .should('have.text', '1');

       cy.get('[data-test="remove-sauce-labs-backpack"]').click()
       cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]').should('not.exist')
       cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('not.exist')
       cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').should('not.exist')
       cy.get('[data-test="shopping-cart-badge"]').should('not.exist')

      })
    
    })


  })

  })

  it('Checkout calculates the final price correctly', () => {
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="inventory-sidebar-link"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click()

    cy.get('.checkout_info').should('be.visible')
    cy.get('[data-test="firstName"]').type('Victor')
    cy.get('[data-test="lastName"]').type('Atavila')
    cy.get('[data-test="postalCode"]').type('123456')
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="inventory-item-name"]').should(itemName => {
      expect(itemName.text().trim()).to.equal(testedProductTitle)
    })

    cy.get('[data-test="inventory-item-desc"]').should(itemDescription => {
      expect(itemDescription.text().trim()).to.equal(testedProductDescription)
    })

    cy.get('[data-test="inventory-item-price"]').should(itemPrice => {
      expect(itemPrice.text().trim()).to.equal(testedProductPrice)
    })

    cy.get('[data-test="subtotal-label"]').should(itemTotal => {
      expect(itemTotal.text().trim()).to.equal('Item total: $29.99')
    })

    cy.get('[data-test="tax-label"]').should(taxTotal => {
      expect(taxTotal.text().trim()).to.equal('Tax: $2.40')
    })

    cy.get('[data-test="total-label"]').should(totalPrice => {
      expect(totalPrice.text().trim()).to.equal('Total: $32.39')
    })

    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="checkout-complete-container"]').should('be.visible')
    cy.get('[data-test="pony-express"]').should('be.visible')

    cy.get('[data-test="complete-header"]').should(finishMsgTitle => {
      expect(finishMsgTitle.text().trim()).to.equal('Thank you for your order!')
    })

    cy.get('[data-test="complete-text"]').should(finishMsgText => {
      expect(finishMsgText.text().trim()).to.equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    })

    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

  })


  it('Cannot finish purchase if first name is missing in the checkout', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click()

    cy.get('.checkout_info').should('be.visible')

    cy.get('[data-test="lastName"]').type('Atavila')
    cy.get('[data-test="postalCode"]').type('123456')
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('be.visible')

  })

  
  it('Cannot finish purchase if last name is missing in the checkout', () => {



    cy.get('.checkout_info').should('be.visible')

    cy.get('[data-test="firstName"]').clear()
    cy.get('[data-test="lastName"]').clear()
    cy.get('[data-test="postalCode"]').clear()

    cy.get('[data-test="firstName"]').type('Victor')
    cy.get('[data-test="postalCode"]').type('123456')
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('be.visible')

  })

  it('Cannot finish purchase if postal code is missing in the checkout', () => {

    cy.get('[data-test="firstName"]').clear()
    cy.get('[data-test="lastName"]').clear()
    cy.get('[data-test="postalCode"]').clear()


    cy.get('[data-test="firstName"]').type('Victor')
    cy.get('[data-test="lastName"]').type('Atavila')
    cy.get('[data-test="postalCode"]').clear()
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('be.visible')

  })

  it('Item can be removed from the cart', () => {

    cy.get('[data-test="cancel"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

  })

})