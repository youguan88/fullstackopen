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