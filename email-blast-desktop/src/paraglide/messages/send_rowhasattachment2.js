/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Rowhasattachment2Inputs */

const en_send_rowhasattachment2 = /** @type {(inputs: Send_Rowhasattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Has PDF`)
};

const id_send_rowhasattachment2 = /** @type {(inputs: Send_Rowhasattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ada PDF`)
};

/**
* | output |
* | --- |
* | "Has PDF" |
*
* @param {Send_Rowhasattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_rowhasattachment2 = /** @type {((inputs?: Send_Rowhasattachment2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Rowhasattachment2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_rowhasattachment2(inputs)
	return en_send_rowhasattachment2(inputs)
});
export { send_rowhasattachment2 as "send.rowHasAttachment" }