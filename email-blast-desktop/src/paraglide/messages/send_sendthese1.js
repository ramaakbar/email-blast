/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Sendthese1Inputs */

const en_send_sendthese1 = /** @type {(inputs: Send_Sendthese1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send these`)
};

const id_send_sendthese1 = /** @type {(inputs: Send_Sendthese1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim ini`)
};

/**
* | output |
* | --- |
* | "Send these" |
*
* @param {Send_Sendthese1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_sendthese1 = /** @type {((inputs?: Send_Sendthese1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Sendthese1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_sendthese1(inputs)
	return en_send_sendthese1(inputs)
});
export { send_sendthese1 as "send.sendThese" }