describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const testUser = {
      'username': 'test',
      'name': 'Test Tester',
      'password': 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.login-form').contains('Log in')
  })

  describe('Login', function() {
    it('Fails with wrong credentials', function() {
      cy.get('#login-button').click()
      cy.contains('Invalid username or password!')

      cy.get('#form-username').type('test')
      cy.get('#login-button').click()
      cy.contains('Invalid username or password!')

      cy.get('#form-password').type('test')
      cy.get('#login-button').click()
      cy.contains('Invalid username or password!')

      cy.get('#form-username').type('username')
      cy.get('#form-password').type('password')
      cy.get('#login-button').click()
      cy.contains('Invalid username or password!')
    })

    it('Succeeds with correct credentials', function() {
      cy.get('#form-username').type('test')
      cy.get('#form-password').type('test')
      cy.get('#login-button').click()
      cy.get('.blog-list')
      cy.contains('blogs')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })

      cy.createBlog({
        title: 'blog title',
        author: 'blog author',
        url: 'blog url'
      })
    })

    it('A blog can be created', function() {
      cy.get('#toggle-create-form-button').click()
      cy.get('#form-title').type('testtitle')
      cy.get('#form-author').type('testauthor')
      cy.get('#form-url').type('testurl')
      cy.get('#create-button').click()

      cy.get('.blog-list').contains('testtitle')
      cy.get('.blog-list').contains('testauthor')
    })

    it('A blog can be liked', function() {
      cy.get('.toggle-expand-button').first().click()
      cy.contains('Likes: 0')
      cy.get('#like-button').click()
      cy.contains('Likes: 1')

      /* Make sure change is not only client-side */
      cy.reload()
      cy.get('.toggle-expand-button').first().click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.reload()
      cy.get('.toggle-expand-button').first().click()
      cy.get('#delete-button').click()

      cy.get('blog-title').should('not.exist')
    })
  })

  describe('A list of blogs', function() {
    let nofBlogs = 5

    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })

      for (let i = 1; i <= nofBlogs; i++) {
        cy.createBlog({
          title: `blog${i} title`,
          author: `blog${i} author`,
          url: `blog${i} url`,
          likes: (i % 2) * (i * 5) + i
        })
      }
    })

    it('should be in correct order based on likes', function() {
      cy.get('.toggle-expand-button').click({ multiple: true })

      let lastLikes = Infinity
      cy.get('.likes').each($likes => {
        const likes = parseInt($likes.text())
        expect(likes).to.be.at.most(lastLikes)
        lastLikes = likes
      })
    })
  })
})