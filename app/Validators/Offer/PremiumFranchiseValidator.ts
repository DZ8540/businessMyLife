// * Types
import { CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// * Types

import IndexValidator from '../IndexValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import { getOfferIdRules } from '../Rules/Offer/offer'
import { TABLES_NAMES } from 'Config/database'
import { getPremiumSlotIdRule } from '../Rules/premiumSlots'

export default class PremiumFranchiseValidator extends IndexValidator {
	constructor(protected ctx: HttpContextContract) {
		super()
	}

	/**
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
	public schema = schema.create({
		offerId: schema.number(getOfferIdRules(TABLES_NAMES.OFFERS)),
		placedForMonths: schema.number([rules.unsigned(), rules.range(3, 6)]),
		slots: schema.array().members(schema.number(getPremiumSlotIdRule())),
	})

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	public messages: CustomMessages = this.messages
}
