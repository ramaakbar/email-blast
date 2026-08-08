/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendingfailed1Inputs */

const en_compose_sendingfailed1 = /** @type {(inputs: Compose_Sendingfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending failed.`)
};

const id_compose_sendingfailed1 = /** @type {(inputs: Compose_Sendingfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengiriman gagal.`)
};

/**
* | output |
* | --- |
* | "Sending failed." |
*
* @param {Compose_Sendingfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingfailed1 = /** @type {((inputs?: Compose_Sendingfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendingfailed1(inputs)
	return en_compose_sendingfailed1(inputs)
});
export { compose_sendingfailed1 as "compose.sendingFailed" }