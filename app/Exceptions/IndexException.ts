
// * Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// * Types

import { Exception } from '@adonisjs/core/build/standalone'

export default class IndexException extends Exception {
  protected body?: any
  protected errors?: any

  constructor(message: string, errors?: any, body?: any, status?: number, code?: string) {
    super(message, status, code)

    this.body = body
    this.errors = errors
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({
      status: error.status,
      code: error.code,
      message: error.message,
      body: error.body,
      errors: error.errors,
    })
  }
}