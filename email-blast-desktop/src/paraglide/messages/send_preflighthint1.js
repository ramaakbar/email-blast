/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Preflighthint1Inputs */

const en_send_preflighthint1 = /** @type {(inputs: Send_Preflighthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The pre-flight checks the SMTP connection before the first email goes out.`)
};

const id_send_preflighthint1 = /** @type {(inputs: Send_Preflighthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pre-flight memeriksa koneksi SMTP sebelum email pertama terkirim.`)
};

/**
* | output |
* | --- |
* | "The pre-flight checks the SMTP connection before the first email goes out." |
*
* @param {Send_Preflighthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_preflighthint1 = /** @type {((inputs?: Send_Preflighthint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Preflighthint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_preflighthint1(inputs)
	return en_send_preflighthint1(inputs)
});
export { send_preflighthint1 as "send.preflightHint" }