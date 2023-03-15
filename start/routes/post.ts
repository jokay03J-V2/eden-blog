import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/post', 'PostsController.create').as('post.create')
  Route.get('/post/create', 'PostsController.createShow').as('post.create.show')
})
