/* eslint-disable linebreak-style */
Cypress.Commands.add('createBlog', ({ title, author, url, user }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, user },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  })

  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit('http://localhost:5173')
  })
})