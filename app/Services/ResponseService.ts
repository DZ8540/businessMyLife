
// * Types
import type { Err } from 'Contracts/response'
// * Types

import { ResponseCodes, ResponseMessages } from 'Config/response'

type HttpResponse = Err & {
    status: number
}

export default class ResponseService{
    constructor(message: ResponseMessages, body?: HttpResponse['body']){
        return {
            status: 200,
            body,
            message,
            code: ResponseCodes.SUCCESS
        }
    }
}