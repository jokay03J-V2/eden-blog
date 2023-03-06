import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      { username: 'jokay', email: 'test@test.com', password: 'testpassword' },
      { username: 'speculos', email: 'cinnamon@test.com', password: 'spicypassword' },
      { username: 'admin', email: 'admin@test.com', password: 'admin', is_admin: true },
    ])
  }
}
