import { rules } from '@ioc:Adonis/Core/Validator';
import { FEEDBACK_QUESTION_MAX_LENGTH, FEEDBACK_QUESTION_MIN_LENGTH } from 'Config/database';

export function getFeedbackNameRules(){
    return [
        rules.minLength(4), rules.maxLength(45)
    ]
}

export function getFeedbackEmailRules(){
    return [
        rules.email()
    ]
}

export function getFeedbackQuestionRules(){
    return [
        rules.minLength(FEEDBACK_QUESTION_MIN_LENGTH), rules.maxLength(FEEDBACK_QUESTION_MAX_LENGTH)
    ]
}