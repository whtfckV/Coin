/// <reference types="cypress" />

const HOST = 'http://localhost:8080/';

function authorization() {
  cy.getBySel('login').type('developer');
  cy.getBySel('password').type('skillbox');

  cy.getBySel('submit').click();

  cy.url().should('include', '/accounts')
}

describe('Приложение Coin.', () => {
  let lastCardNumber;

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
    cy.getBySel('card').then(cards => {
      cy.getBySel('create').click().wait(2000).then(() => {
        cy.getBySel('card').then(newCards => {
          expect(newCards.length).equal(cards.length + 1)
          lastCardNumber = cards[cards.length - 1].querySelector('[data-test=account]').textContent;
        });
      });
    });
  });

  it.only('Перевод на новый счет', () => {
    authorization();
    cy.getBySel('sender').click();
    cy.getBySel('recipient').type(lastCardNumber);
    cy.getBySel('amount').type('1234');
    cy.getBySel('transfer').click();
    cy.getBySel('lastTransaction').should('contain.text', '- 1234').should('have.class', 'outgoing');
  });

  it.only('Перевод с нового счета', () => {
    authorization();
    cy.getBySel('account').then(cards => {
      const newCardLink = Array.from(cards).filter(card => card.textContent === lastCardNumber)[0].parentNode.querySelector('a');
      cy.get(newCardLink).click();
      cy.getBySel('recipient').type('21845780014141626544677867');
      cy.getBySel('amount').type('1234');
      cy.getBySel('transfer').click();
      cy.getBySel('lastTransaction').should('contain.text', '- 1234').should('have.class', 'outgoing');
      // debugger;
    });


  });
});
