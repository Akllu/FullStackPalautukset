describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress User',
      username: 'cypress',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'cypress', password: 'test' })
      cy.contains('Cypress User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Cypress User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title-input').type('test')
      cy.get('#author-input').type('Cypress')
      cy.get('#url-input').type('www.cypress.com')
      cy.get('#likes-input').type('12')
      cy.contains('Submit').click()
      cy.contains('A new blog test by Cypress added!')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'test',
        author: 'test',
        url: 'www.test.fi',
        likes: '3'
      })
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes 4')
    })

    it('A blog can be deleted by its owner', function() {
      cy.createBlog({
        title: 'test',
        author: 'test',
        url: 'www.test.fi',
        likes: '3'
      })
      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'test Cypress')
    })

    it('Blogs are sorted by likes', function() {
      cy.createBlog({
        title: 'blog1',
        author: 'me',
        url: 'www.test.fi',
        likes: '2'
      })
      cy.createBlog({
        title: 'blog2',
        author: 'me',
        url: 'www.test.fi',
        likes: '2'
      })
      cy.createBlog({
        title: 'blog3',
        author: 'me',
        url: 'www.test.fi',
        likes: '87'
      })
      cy.contains('blog1').find('button').click()
      cy.contains('Like').click()

      cy.get('.blogsContainer').get('.testBlogContainer:first').should('contain', 'blog3')
      cy.get('.blogsContainer').get('.testBlogContainer:last').should('contain', 'blog2')
    })
  })
})