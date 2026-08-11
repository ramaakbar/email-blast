/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Recipientsource1Inputs */

const en_send_recipientsource1 = /** @type {(inputs: Send_Recipientsource1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient source`)
};

const id_send_recipientsource1 = /** @type {(inputs: Send_Recipientsource1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sumber penerima`)
};

/**
* | output |
* | --- |
* | "Recipient source" |
*
* @param {Send_Recipientsource1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_recipientsource1 = /** @type {((inputs?: Send_Recipientsource1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Recipientsource1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_recipientsource1(inputs)
	return en_send_recipientsource1(inputs)
});
export { send_recipientsource1 as "send.recipientSource" }