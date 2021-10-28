

describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST','http://localhost:3002/api/testing/reset')
    const user =
      { name:'Ali',
        username:'Ali1990',
        password:'1990' }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  ////////////////////////////////////////////
  it('login form is shown', function(){
    cy.contains('login')
  })
  ///////////////////////////////////////////
  describe('login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('Ali1990')
      cy.get('#password').type('1990')
      cy.get('#login-button').click()
      cy.contains('Ali logged in')
    })

    it('fail with wrong credentials', function(){
      cy.get('#username').type('Ali199')
      cy.get('#password').type('1990')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css','color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Ali logged in')
    })
  })
  //////////////////////////////////////////
  describe('when logged in', function(){
    beforeEach(function(){
      //cy.get('#username').type('Ali1990')
      //cy.get('#password').type('1990')
      //cy.get('#login-button').click()
      cy.login({ username: 'Ali1990', password: '1990' })
    })

    it('A blog can be created', function(){

      /*cy.contains('Create new blog').click()
      cy.get('#title').type('University')
      cy.get('#auther').type('Moodix')
      cy.get('#url').type('//')
      cy.get('#creat-button').click()
      cy.contains('a new blog University added')*/
      cy.createBlog({ title: 'University', auther:'Moodix', url:'///' })
      cy.createBlog({ title: 'Hospital', auther:'Hassan', url:'///' })
      cy.contains('University')
      cy.contains('Hospital')
    })

    it('User can like blogs',function(){
      cy.createBlog({ title: 'School', auther:'Moodix', url:'///' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('User can delete blog',function(){
      cy.createBlog({ title: 'Highschool', auther:'Sedi', url:'///' })
      cy.createBlog({ title: 'School', auther:'Moodix', url:'///' })
      cy.contains('Sedi').contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'Sedi')
      //new user logged in to delete moodix
      const newuser =
      { name:'Hasan',
        username:'Hassan',
        password:'2021' }
      cy.request('POST', 'http://localhost:3002/api/users/', newuser)
      cy.visit('http://localhost:3000')
      cy.login({ username: 'Hassan', password: '2021' })
      cy.get('html').should('not.contain', 'Moodix')
      cy.contains('logout').click()
    })
  })

  describe('sorting', function(){
    beforeEach(function(){
      cy.login({ username: 'Ali1990', password: '1990' })
    })

    it('sort', function(){
      cy.createBlog({ title: 'test1', auther:'Moodix', url:'///test1',likes: 100 })
      cy.createBlog({ title: 'test2', auther:'Hassan', url:'///test2',likes:5 })
      cy.createBlog({ title: 'test3', auther:'Hassan', url:'///test3',likes:20 })
      cy.createBlog({ title: 'test4', auther:'Hassan', url:'///test4',likes:65 })

      cy.contains('test1').as('blog1')
      cy.contains('test2').parent().as('blog2')
      cy.contains('test3').as('blog3')
      cy.contains('test4').as('blog4')


      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()

      cy.get('.blogclass').eq(0).contains('Moodix').should('exist')
      cy.get('.blogclass').eq(1).contains('test4').should('exist')

    })

  })
})