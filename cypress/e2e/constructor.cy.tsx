   describe('проверяем страницу конструктора бургера', function() {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients')
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json'}).as('user')
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken')
    })
    cy.setCookie('accessToken', 'mockAccessToken')
    cy.visit('http://localhost:4000');
    cy.wait('@ingredients');
  })

  afterEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken')
    })
    cy.clearCookie('accessToken')
  })

  it('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit('http://localhost:4000');
  })

  describe('проверяем работу блока с ингредиентами', () => {
    it('тестируем работу модальных окон', () => {
      cy.get('[data-cy=ingredient-categories]')
        .contains('Краторная булка N-200i')
        .click()
      cy.get('[data-cy=modal-close-button]')
        .click()  
    })
  })

  describe('проверяем конструктор бургера', () => {
    it('тестируем создание заказа', () => {
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order')
  
      cy.get('[data-cy=ingredient-categories]')
        .contains('Булки')
        .next('ul')
        .contains('Добавить')
        .click()
      cy.get('[data-cy=ingredient-categories]')
        .contains('Начинки')
        .next('ul')
        .contains('Добавить')
        .click()
      cy.get('[data-cy=ingredient-categories]')
        .contains('Соусы')
        .next('ul')
        .contains('Добавить')
        .click()
  
      cy.get('[data-cy=selected-bun]')
        .contains('Краторная булка N-200i')
        .should('exist')
      cy.get('[data-cy=selected-main]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist')
      cy.get('[data-cy=selected-main]')
        .contains('Соус Spicy-X')
        .should('exist')
  
      cy.get('[data-cy=create-order-block]')
        .contains('Оформить заказ')
        .click()
      cy.get('[data-cy=order-details]')
        .contains('64439')
        .should('exist')
        .should('be.visible')
      
      cy.get('[data-cy=modal-close-button]')
        .click()
      cy.get('[data-cy=order-details]')
        .should('not.exist')
  
      cy.get('[data-cy=selected-bun]')
        .should('not.exist')
      cy.get('[data-cy=selected-main]')
        .should('not.exist')
    })
  })
})





