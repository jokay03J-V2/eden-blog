import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({})
  public title: string

  @column({})
  public content: string

  @column()
  public author_id: number

  @hasOne(() => User, { localKey: 'author_id', foreignKey: 'id' })
  public author: HasOne<typeof User>

  @attachment({ preComputeUrl: true })
  public image: AttachmentContract

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
