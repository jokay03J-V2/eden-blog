import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async create({ auth, response, request }: HttpContextContract) {
    if (!auth.isLoggedIn) response.redirect().back()
    const postSchema = schema.create({
      title: schema.string({}, [rules.minLength(2), rules.maxLength(50)]),
      image: schema.file({ extnames: ['jpg', 'png', 'svg'], size: '10mb' }),
      content: schema.string(),
    })

    const payload = await request.validate({
      schema: postSchema,
      messages: {
        'title.required': 'le titre est obligatoire',
        'title.minLength': 'le titre doit faire plus de 2 caractères',
        'title.maxLength': 'le titre doit au maximum 50 caractères',
        'file.size': "l'image ne doit pas dépasser 10mb",
        'file.extname': 'les types de fichier supporter sont {{ options.extnames }}',
      },
    })
    const image = Attachment.fromFile(payload.image)
    try {
      const post = await Post.create({ ...payload, image, author_id: auth.user?.id })
      await post.image.computeUrl()
      await post.load('author')
      response.redirect('/')
    } catch (error) {
      response.internalServerError()
    }
  }

  public createShow({ view, auth, response }: HttpContextContract) {
    if (!auth.isLoggedIn) response.redirect().back()
    return view.render('post/create')
  }
}
