describe('Testes para Calculadora de Idade', () => {
  it('Idade 25 anos', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/C%C3%A1lculo%20de%20Idade/');
    cy.get("#nascimento").type("1998-02-27");
    cy.get(".btn").contains("Calcular").click();

    cy.get("#result").should("have.text", "25 anos");
  });

  it('Idade 23 anos', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/C%C3%A1lculo%20de%20Idade/');
    cy.get("#nascimento").type("2000-02-27");
    cy.get(".btn").contains("Calcular").click();

    cy.get("#result").should("have.text", "23 anos");
  });
});

describe('Testes para Calculadora', () => {
  it('Soma', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/Calculadora/');
    cy.get("#numb1").type("10");
    cy.get("#numb2").type("10");
    cy.get(".btn").contains("Calcular").click();

    cy.get("#result").should("have.text", "20");
  });

  it('Soma com virgula', () => {
    cy.visit('https://samucab2b.github.io/aulas-test-sistemas-senai/Calculadora/');
    cy.get("#numb1").type("17,5");
    cy.get("#numb2").type("10");
    cy.get(".btn").contains("Calcular").click();

    cy.get("#result").should("have.text", "27,5");
  });
});