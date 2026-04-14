/// <reference types="cypress" />

describe('Интеграционные тесты для страницы конструктора', () => {
  beforeEach('Настроен перехват запроса на эндпоинт api/ingredients', () => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach('Очистка cookies и localStorage', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Добавление булки, начинки и соуса в конструктор', () => {
    // Точные названия из вашего файла fixtures/ingredients.json
    cy.addIngredient('ingredients-buns', 'Краторная булка N-200i');
    cy.addIngredient('ingredients-mains', 'Биокотлета из марсианской Магнолии');
    cy.addIngredient('ingredients-sauces', 'Соус Spicy-X'); // <-- Название как в API

    // Проверки, что они добавились
    cy.get('[data-testid="constructor-bun"]').should('exist');
    cy.get('[data-testid="constructor-ingredient"]').should('have.length.at.least', 2);
  });

  it('Открытие, проверка и закрытие модалки по крестику', () => {
    const ingredient = 'Краторная булка N-200i';
    cy.openIngredientModal(ingredient);
    cy.closeModal('cross');
  });

  it('Закрытие модалки через оверлей', () => {
    const ingredient = 'Филе Люминесцентного тетраодонтимформа';
    cy.openIngredientModal(ingredient);
    cy.closeModal('overlay');
  });

  it('Закрытие модалки по нажатию Esc', () => {
    const ingredient = 'Соус Spicy-X';
    cy.openIngredientModal(ingredient);
    cy.closeModal('esc');
  });

  it('Создание заказа', () => {
    // Подставляются моковые токены авторизации
    cy.fixture('user.json').then((userData) => {
      cy.setCookie('accessToken', 'fake-access-token');
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      
      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: userData
      });
    });

    // Мок ответа на запрос создания заказа
    cy.fixture('order.json').then((response) => {
      cy.intercept('POST', '/api/orders', { statusCode: 200, body: response });
    });

    cy.visit('/');
    cy.wait('@getIngredients');

    // Сборка бургера
    cy.addIngredient('ingredients-buns', 'Краторная булка N-200i');
    cy.addIngredient('ingredients-mains', 'Биокотлета из марсианской Магнолии');
    cy.addIngredient('ingredients-mains', 'Филе Люминесцентного тетраодонтимформа');

    // Клик по кнопке "Оформить заказ"
    cy.get('[data-testid="order-button"]').click();

    // Проверка открытия модального окна
    cy.get('[data-testid="modal"]').should('be.visible');

    // Проверка номера заказа (из вашего order.json)
    cy.get('[data-testid="order-number"]').should('contain', '54321');

    // Проверка закрытия модального окна
    cy.closeModal('cross');
    
    // Проверка, что конструктор пуст (опционально)
    cy.get('[data-testid="constructor-bun"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredient"]').should('not.exist');
  });
});
