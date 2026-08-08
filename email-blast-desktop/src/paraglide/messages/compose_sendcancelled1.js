/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendcancelled1Inputs */

const en_compose_sendcancelled1 = /** @type {(inputs: Compose_Sendcancelled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send cancelled.`)
};

const id_compose_sendcancelled1 = /** @type {(inputs: Compose_Sendcancelled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengiriman dibatalkan.`)
};

/**
* | output |
* | --- |
* | "Send cancelled." |
*
* @param {Compose_Sendcancelled1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendcancelled1 = /** @type {((inputs?: Compose_Sendcancelled1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendcancelled1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendcancelled1(inputs)
	return en_compose_sendcancelled1(inputs)
});
export { compose_sendcancelled1 as "compose.sendCancelled" }