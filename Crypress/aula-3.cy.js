describe('Aula Cypress - Arquivos', () => {
  it('Verifica o download de um Arquivo', {defaultCommandTimeout: 5000}, () => {
    cy.visit('https://gh-users-search.netlify.app/')
    cy.get('[data-testid="search-bar"]').type("samucab2b")
    cy.get('button[type="submit"]').click()

    cy.get(':nth-child(1) > div > h3').should('have.text', "2")
    cy.get('header > div > h4').should('have.text', "Samuel Bressan")
    cy.get(':nth-child(3) > div > h4').contains("LEOO1992", {matchCase: false})
  })
})
