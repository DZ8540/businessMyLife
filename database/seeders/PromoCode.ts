import Logger from '@ioc:Adonis/Core/Logger'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PromoCodesFactory } from 'Database/factories'

export default class extends BaseSeeder {
  public async run () {

    try {
      await PromoCodesFactory.createMany(10)
    } catch (err: any) {
      Logger.error(err)
    }

  }
}
