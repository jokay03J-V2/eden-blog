import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/register', 'AuthController.registerShow').as('auth.register.show')
  Route.post('/registerLogic', 'AuthController.register').as('auth.register')
})
