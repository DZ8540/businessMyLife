import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeedbackValidator from 'App/Validators/FeedbackValidator'
import { ResponseCodes, ResponseMessages } from 'Config/response'
import { Err } from 'Contracts/response'
import ExceptionService from 'App/Services/ExceptionService'
import FeedbackService from 'App/Services/FeedbackService'
import ResponseService from 'App/Services/ResponseService'

export default class FeedbacksController {
    public async create({request, response}: HttpContextContract){
        let payload: FeedbackValidator['schema']['props']

        try {
            payload = await request.validate(FeedbackValidator)
        } catch (error: Err | any) {
            throw new ExceptionService({
             code: ResponseCodes.VALIDATION_ERROR,
             message: ResponseMessages.VALIDATION_ERROR,
             body: error.messages   
            })
        }

        try {
            await FeedbackService.create(payload)
            return response.status(200).send(new ResponseService(ResponseMessages.SUCCESS))
        } catch (error: Err | any) {
            throw new ExceptionService(error)
        }
    }
}
