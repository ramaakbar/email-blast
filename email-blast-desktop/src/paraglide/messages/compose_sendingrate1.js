/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendingrate1Inputs */

const en_compose_sendingrate1 = /** @type {(inputs: Compose_Sendingrate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending rate`)
};

const id_compose_sendingrate1 = /** @type {(inputs: Compose_Sendingrate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kecepatan pengiriman`)
};

/**
* | output |
* | --- |
* | "Sending rate" |
*
* @param {Compose_Sendingrate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingrate1 = /** @type {((inputs?: Compose_Sendingrate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingrate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendingrate1(inputs)
	return en_compose_sendingrate1(inputs)
});
export { compose_sendingrate1 as "compose.sendingRate" }