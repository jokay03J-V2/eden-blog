import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ request, auth, response, session }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({}),
    })

    const { email, password } = await request.validate({
      schema: userSchema,
      messages: {
        'required': 'le champs {{field}} est obligatoire',
        'email.email': "l'email n'est pas valide",
      },
    })

    try {
      await auth.attempt(email, password)
    } catch (error) {
      session.flash('errors', ['Ton email ou ton mot de passe est incorrect'])
      return response.redirect().back()
    }

    return response.redirect().back()
  }
}
