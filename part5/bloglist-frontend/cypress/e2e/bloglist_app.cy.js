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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username:'emily',
        password: 'magic'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('Reach out for the stars')
      cy.get('#author').type('Dan Grey')
      cy.get('#url').type('www.dangrey.com')
      cy.get('#createblog-button').click()
      cy.contains('a new blog Reach out for the stars by Dan Grey added')
    })
  })

})