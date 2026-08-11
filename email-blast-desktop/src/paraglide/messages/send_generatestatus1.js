/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Generatestatus1Inputs */

const en_send_generatestatus1 = /** @type {(inputs: Send_Generatestatus1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate status`)
};

const id_send_generatestatus1 = /** @type {(inputs: Send_Generatestatus1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status generate`)
};

/**
* | output |
* | --- |
* | "Generate status" |
*
* @param {Send_Generatestatus1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_generatestatus1 = /** @type {((inputs?: Send_Generatestatus1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Generatestatus1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_generatestatus1(inputs)
	return en_send_generatestatus1(inputs)
});
export { send_generatestatus1 as "send.generateStatus" }