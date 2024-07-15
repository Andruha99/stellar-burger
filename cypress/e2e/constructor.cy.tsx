describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('Tests for burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
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
});
