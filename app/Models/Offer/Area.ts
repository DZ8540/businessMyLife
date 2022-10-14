// * Types
import type { DateTime } from 'luxon'
import type { HasMany } from '@ioc:Adonis/Lucid/Orm'
// * Types

import Subsection from './Subsection'
import { GLOBAL_DATETIME_FORMAT } from 'Config/app'
import { BaseModel, column, computed, hasMany, scope } from '@ioc:Adonis/Lucid/Orm'

export default class Area extends BaseModel {
  public static readonly columns = [
    'id',
    'name',
    'createdAt', 'updatedAt',
  ] as const

  /**
   * * Columns
   */

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * * Relations
   */

  @hasMany(() => Subsection)
  public subsections: HasMany<typeof Subsection>

  /**
   * * Computed properties
   */

  @computed()
  public get createdAtForUser(): string {
    return this.createdAt.setLocale('ru-RU').toFormat(GLOBAL_DATETIME_FORMAT)
  }

  /**
   * * Query scopes
   */

   public static search = scope((query, searchQuery: string) => {
    query.where('name', 'ILIKE', `%${searchQuery}%`)
  })
}
