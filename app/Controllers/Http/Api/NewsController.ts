// * Types
import type News from 'App/Models/News'
import type { Err } from 'Contracts/response'
import type { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// * Types

import NewsService from 'App/Services/NewsService'
import ApiValidator from 'App/Validators/ApiValidator'
import ExceptionService from 'App/Services/ExceptionService'
import { ResponseCodes, ResponseMessages } from 'Config/response'
import ResponseService from 'App/Services/ResponseService'

export default class NewsController{
    public async paginate({request, response}: HttpContextContract){
        let payload: ApiValidator['schema']['props']

        try {
            payload = await request.validate(ApiValidator)
        } catch (error: Err | any) {
            throw new ExceptionService({
                code: ResponseCodes.VALIDATION_ERROR,
                message: ResponseMessages.VALIDATION_ERROR,
                body: error.messages
            })
        }

        try {
            const news: ModelPaginatorContract<News> = await NewsService.paginateNews(payload)
            return response.status(200).send(new ResponseService(ResponseMessages.SUCCESS, news))
        } catch (error: Err | any) {
            throw new ExceptionService(error)
        }
    }

    public async get({request, response}: HttpContextContract){
        const id: number = request.param('id', 1)

        try {
            const item = await NewsService.get(id)
            return response.status(200).send(new ResponseService(ResponseMessages.SUCCESS, item))
        } catch (error: Err | any) {
            throw new ExceptionService(error)
        }
    }
}