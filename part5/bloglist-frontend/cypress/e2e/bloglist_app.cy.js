describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'emily',
      'name': 'emily watsons',
      'password': 'magic'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('emily')
      cy.get('#password').type('magic')
      cy.get('#login-button').click()
      cy.contains('emily watsons logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('emily')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})