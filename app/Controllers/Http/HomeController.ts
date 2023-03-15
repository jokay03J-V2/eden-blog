import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public show({ view }: HttpContextContract) {
    return view.render('home')
  }
}
