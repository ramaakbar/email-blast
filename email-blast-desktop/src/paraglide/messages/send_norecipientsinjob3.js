/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Norecipientsinjob3Inputs */

const en_send_norecipientsinjob3 = /** @type {(inputs: Send_Norecipientsinjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This generate job has no recipients.`)
};

const id_send_norecipientsinjob3 = /** @type {(inputs: Send_Norecipientsinjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate job ini tidak punya penerima.`)
};

/**
* | output |
* | --- |
* | "This generate job has no recipients." |
*
* @param {Send_Norecipientsinjob3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_norecipientsinjob3 = /** @type {((inputs?: Send_Norecipientsinjob3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Norecipientsinjob3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_norecipientsinjob3(inputs)
	return en_send_norecipientsinjob3(inputs)
});
export { send_norecipientsinjob3 as "send.noRecipientsInJob" }