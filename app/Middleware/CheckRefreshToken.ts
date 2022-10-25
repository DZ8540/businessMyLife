// * Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// * Types

import ExceptionService from 'App/Services/ExceptionService'
import { COOKIE_REFRESH_TOKEN_KEY } from 'Config/auth'
import { ResponseCodes, ResponseMessages } from 'Config/response'

export default class CheckRefreshToken {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    if (!request.cookie(COOKIE_REFRESH_TOKEN_KEY)) {
      throw new ExceptionService({
        code: ResponseCodes.CLIENT_ERROR,
        message: ResponseMessages.TOKEN_ERROR,
      })
    }

    await next()
  }
}
