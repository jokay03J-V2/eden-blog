import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ response, request, auth, logger }: HttpContextContract) {
    const requestPayload = schema.create({
      username: schema.string({}, [
        rules.minLength(3),
        rules.maxLength(30),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({}, [rules.minLength(3)]),
    })

    const payload = await request.validate({
      schema: requestPayload,
      messages: {
        'username.required': 'le surnom est obligatoire.',
        'email.required': "l'email est obligatoire.",
        'password.required': 'le mot de passe est obligatoire.',
        'username.minLenght': 'le surnom doit avoir 3 caractères minimum.',
        'username.maxLenght': 'le surnom peut avoir 30 caractères maximum.',
        'password.minLenght': 'le mot de passe doit avoir 3 caractères mnimum.',
        'email.email': "l'email est invalide.",
        'email.unique': 'cette email est déjà pris.',
        'username.unique': 'le surnom est déjà pris.',
      },
    })

    try {
      const user = await User.create(payload)
      auth.login(user)
    } catch (error) {
      logger.error(error)
      response.internalServerError()
    }

    return response.redirect().back()
  }

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
      console.log(error)

      session.flash('errors', ['Ton email ou ton mot de passe est incorrect'])
      return response.redirect('/')
    }

    return response.redirect().back()
  }
}
