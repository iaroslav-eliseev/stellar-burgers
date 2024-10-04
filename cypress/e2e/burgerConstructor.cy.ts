import Cypress from 'cypress';


const selectorFilling = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;
const selectorBun = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const selectorAnotherBun = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const selectorOrderBtn = `[data-cy=${'order-button'}]`;
const selectorOverlay = `[data-cy=${'overlay'}]`;
const constructorBun1 = `[data-cy=${'top-element'}]`;
const constructorBun2 = `[data-cy=${'bottom-element'}]`;
const constructorIngredient = `[data-cy=${'constructor-ingredient'}]`;

beforeEach(() => {
  cy.intercept('POST', `/auth/login`, {
    fixture: 'user.json'
  });
  
  cy.intercept('GET', `/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.intercept(`/api/auth/user`, {
    authorization: 'Bearer lorem',
    fixture: 'user.json'
  }).as('user')

  cy.intercept('POST', `/orders`, {
    fixture: 'order.json'
  });

  cy.visit('/');
  cy.get('#modals').as('modal');
});

describe('add to list', () => {
  it('increment counter', () => {
    cy.get(selectorFilling).children('button').click();
    cy.get(selectorFilling).find('.counter__num').contains('1');
  });
  describe('add bun and filling', () => {
    it('add bun and filling to orderlist', () => {
      cy.get(selectorBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
      cy.get(selectorFilling).children('button').click();
      cy.get(constructorIngredient).should('be.not.empty');
    });
    it('add bun after filling', () => {
      cy.get(selectorFilling).children('button').click();
      cy.get(constructorIngredient).should('be.not.empty');
      cy.get(selectorBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
    });
  });
  describe('switch bun', () => {
    it('switch bun1', () => {
      cy.get(selectorBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
      cy.get(selectorAnotherBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
    });
    it('switch bun2', () => {
      cy.get(selectorBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
      cy.get(selectorFilling).children('button').click();
      cy.get(constructorIngredient).should('be.not.empty');
      cy.get(selectorAnotherBun).children('button').click();
      cy.get(constructorBun1).should('be.not.empty');
      cy.get(constructorBun2).should('be.not.empty');
    });
  });
});

describe('create order', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'ipsum');
    cy.setCookie('accessToken', 'lorem');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });
  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });


  it('send order to check responce', () => {
    cy.get(selectorBun).children('button').click();
    cy.get(selectorFilling).children('button').click();
    cy.get(selectorOrderBtn).click();
    cy.get('@modal').find('h2').should('be.not.empty');
  });
});

describe('modal', () => {
  it('open and check data modal ingredient', () => {
    cy.get('@modal').should('be.empty');
    cy.get(selectorFilling).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0941');
    cy.get('@modal').find('h3').should('include.text', 'Биокотлета из марсианской Магнолии');
  });
  it('close modal ingredient by click on <X>', () => {
    cy.get('@modal').should('be.empty');
    cy.get(selectorFilling).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
  it('close modal ingredient by click on overlay', () => {
    cy.get('@modal').should('be.empty');
    cy.get(selectorFilling).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get(selectorOverlay).click({ force: true });
    cy.get('@modal').should('be.empty');
  });
  it('close modal ingredient by «Escape»', () => {
    cy.get('@modal').should('be.empty');
    cy.get(selectorFilling).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('@modal').should('be.empty');
  });
});
