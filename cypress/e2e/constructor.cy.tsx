import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe('Tests for burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');

    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');

    localStorage.setItem('refreshToken', 'testRefreshToken123');
    setCookie('accessToken', 'testAccessToken123');
  });

  afterEach(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });

  it('add ingredient to constructor', () => {
    cy.wait('@getIngredients');

    const bun = cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]');
    bun.contains('Добавить').click();

    const ingredient = cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]');
    ingredient.contains('Добавить').click();
  });

  it('open ingredients modal', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy
      .get('[data-cy="643d69a5c3f7b9001cfa0941"]')
      .click();

    ingredientModal.get('h3').contains('Детали ингредиента');
  });

  it('close modal by chrest click', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy
      .get('[data-cy="643d69a5c3f7b9001cfa0941"]')
      .click();

    ingredientModal.should('exist');

    ingredientModal.get('[data-cy="closeButton"]').click();

    ingredientModal.should('not.exist');
  });

  it('close modal by overlay click', () => {
    cy.wait('@getIngredients');

    const ingredientModal = cy
      .get('[data-cy="643d69a5c3f7b9001cfa0941"]')
      .click();

    ingredientModal.should('exist');

    cy.get('[data-cy="modalOverlay"]').click({ force: true });

    ingredientModal.should('not.exist');
  });

  // Создание заказа

  it('create and post order', () => {
    cy.wait('@getIngredients');

    // Собираем бургер.
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').contains('Добавить').click();
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').contains('Добавить').click();

    // Вызываем клик по кнопке «Оформить заказ».
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    // Проверяется, что модальное окно открылось и номер заказа верный.
    const orderModal = cy.get('[data-cy="modal"]');
    orderModal.contains('45817');

    // Закрывается модальное окно и проверяется успешность закрытия.
    orderModal.get('[data-cy="closeButton"]').click();
    orderModal.should('not.exist');

    // Проверяется, что конструктор пуст.
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
  });
});
