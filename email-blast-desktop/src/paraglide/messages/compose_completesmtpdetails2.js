/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Completesmtpdetails2Inputs */

const en_compose_completesmtpdetails2 = /** @type {(inputs: Compose_Completesmtpdetails2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete the SMTP and sender details`)
};

const id_compose_completesmtpdetails2 = /** @type {(inputs: Compose_Completesmtpdetails2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lengkapi detail SMTP dan pengirim`)
};

/**
* | output |
* | --- |
* | "Complete the SMTP and sender details" |
*
* @param {Compose_Completesmtpdetails2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_completesmtpdetails2 = /** @type {((inputs?: Compose_Completesmtpdetails2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Completesmtpdetails2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_completesmtpdetails2(inputs)
	return en_compose_completesmtpdetails2(inputs)
});
export { compose_completesmtpdetails2 as "compose.completeSmtpDetails" }