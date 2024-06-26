describe('Aula Cypress - Validações', () => {


  it('passes', () => {
  cy.visit('https://diteix.github.io/lil-square-of-eight/');

    cy.get('[src="images/settings.png"]').click().pause();

    cy.get('#playerOneName').clear();
    cy.get('#playerOneName').type("Lado Janela");

    cy.get('#playerTwoName').clear();
    cy.get("#playerTwoName").type("Lado parede");
  
    cy.get('#restartButton').click();

    cy.get('body').click(200, 160).pause();

    cy.get('[x=6][y=0]').should("have.css", 'fill', "rgb(0, 0, 255)");

    cy.get('body').click(260, 220);

    cy.get('[x=65][y=59]').should("have.css", 'fill', "rgb(255, 0, 0)");

    cy.get('body').click(200, 220);

    cy.get('body').click(260, 160);

    cy.get('body').click(190, 180);

    cy.get('body').click(320, 160);

    cy.get('body').click(250, 180);

    cy.get('[x=9][y=9]').should("have.css", 'fill', "rgb(0, 0, 255)");

    // | -
    //60
  })
  
  
  it('GreaterThan e First', {defaultCommandTimeout: 5000}, () => {
    cy.visit('https://react-shopping-cart-67954.firebaseapp.com/')
    cy.get(':nth-child(3) > label > .checkmark').click()
    cy.get('.sc-uhudcz-0 .sc-124al1g-1').should('have.length.greaterThan', 2)
    cy.get(':nth-child(2) > label > .checkmark').click()
    cy.get(':nth-child(4) > label > .checkmark').click()
    cy.get('.sc-bj2vay-0 > :nth-child(5)').click()
    cy.get('.sc-uhudcz-0 .sc-124al1g-1').should('have.length.greaterThan', 3)
    cy.get('.bCLaRj > .sc-124al1g-4').contains("Basic Cactus White T-shirt", {matchCase: false}).closest("div").find("p > b").first().contains("13").closest("div").siblings("button").click()

    cy.get('.sc-1h98xa9-11').click()

    cy.on('window:alert', (str) => {
      expect(str).to.include('13.25')
    })
  })

  it('IF', {defaultCommandTimeout: 5000}, () => {
    cy.visit('https://gh-users-search.netlify.app/')

    cy.get('[data-testid="rate-limit"]').then(($element) => {    
      if(!$element.text().includes("0/60")){
        cy.get('[data-testid="search-bar"]').type("samucab2b")
        cy.get('button[type="submit"]').click()

        cy.get(':nth-child(1) > div > h3').should('have.text', "2")
        cy.get('header > div > h4').should('have.text', "Samuel Bressan")
        cy.get(':nth-child(3) > div > h4').contains("LEOO1992", {matchCase: false})
      }
    })   
  })
})
