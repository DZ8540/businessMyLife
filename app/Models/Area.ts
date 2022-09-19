// * Types
import type { DateTime } from 'luxon'
// * Types

import { GLOBAL_DATETIME_FORMAT } from 'Config/app'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

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
   * * Computed properties
   */

  @computed()
  public get createdAtForUser(): string {
    return this.createdAt.setLocale('ru-RU').toFormat(GLOBAL_DATETIME_FORMAT)
  }
}
