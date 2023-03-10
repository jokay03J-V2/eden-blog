import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/login', 'AuthController.loginShow').as('auth.login.show')
  Route.post('loginlogic', 'AuthController.login').as('auth.login')
})
