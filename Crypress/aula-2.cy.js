describe('Testes Sistema de "LOGIN"', {defaultCommandTimeout: 5000}, () => {
  it('Fazendo Login', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/Login/');
    cy.get('#login').type(Cypress.env("usuario"));
    cy.get('#password').type(Cypress.env("password"), {log:false});

    cy.get(".btn").contains("Entrar").click();

    cy.get("#modulo").find("option").should("have.length", 3);
    cy.get('#modulo').select("3");

    cy.get(".btn").contains("Efetivar").click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Você escolheu: Sair de Ferias`)
    });
  });

  it('Selecionando', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/Radio/');

    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .last().should("have.value", "low")
        .check();
  });
});