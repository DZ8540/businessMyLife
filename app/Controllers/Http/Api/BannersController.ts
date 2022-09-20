import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BannerService from 'App/Services/BannerService'
import ExceptionService from 'App/Services/ExceptionService'
import ResponseService from 'App/Services/ResponseService'
import ApiValidator from 'App/Validators/ApiValidator'
import { ResponseCodes, ResponseMessages } from 'Config/response'
import { Err } from 'Contracts/response'

export default class BannersController {
    public async paginate({request, response}: HttpContextContract){
        let payload: ApiValidator['schema']['props']

        try {
            payload = await request.validate(ApiValidator)
        } catch (error: Err | any) {
            throw new ExceptionService({
                message: ResponseMessages.VALIDATION_ERROR,
                code: ResponseCodes.VALIDATION_ERROR,
                body: error.messages
            })
        }

        try {
            const item = await BannerService.paginate(payload)
            return response.status(200).send(new ResponseService(ResponseMessages.SUCCESS, item))
        } catch (error: Err | any) {
            throw new ExceptionService(error)
        }
    }

    public async get({request, response}: HttpContextContract){
        const id: number = request.param('id', 1)

        try {
            const banner = await BannerService.get(id)
            return response.status(200).send(new ResponseService(ResponseMessages.SUCCESS, banner))
        } catch (error: Err | any) {
            throw new ExceptionService(error)
        }
    }
}
