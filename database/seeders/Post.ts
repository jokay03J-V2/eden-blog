import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const user = await User.firstOrFail()
    await Post.createMany([
      {
        author_id: user.id,
        title: 'test title',
        content: 'test content',
      },
    ])
  }
}
