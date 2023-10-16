/// <reference types="cypress" />

const HOST = 'http://localhost:8080/';

function authorization() {
  cy.getBySel('login').type('developer');
  cy.getBySel('password').type('skillbox');

  cy.getBySel('submit').click();

  cy.url().should('include', '/accounts')
}

describe('Приложение Coin.', () => {
  beforeEach(() => {
    cy.visit(HOST);
  });

  it('Пользователь авторизуется', () => {
    authorization();
  });

  it('Просмотр списка счетов', () => {
    authorization();

    cy.getBySel('card')
  });
  it('Перевод с одного счета на другой', () => {
    authorization();
    cy.getBySel('sender').click();
    cy.getBySel('recipient').type('21845780014141626544677867');
    cy.getBySel('amount').type('1234');
    cy.getBySel('transfer').click();
    cy.getBySel('lastTransaction').should('contain.text', '- 1234').should('have.class', 'outgoing');
  });

  it.only('Создание нового счета', () => {
    authorization();
    const cardsLength = cy.getBySel('card').its('length');
    cy.getBySel('create').click();
    cy.getBySel('card').its('length').should('be.gt', cardsLength);
  });
  it('Перевод на новый счет', () => { });
  it('Перевод с нового счета', () => { });
});
