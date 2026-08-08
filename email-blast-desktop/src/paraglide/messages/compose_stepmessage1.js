/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Stepmessage1Inputs */

const en_compose_stepmessage1 = /** @type {(inputs: Compose_Stepmessage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message`)
};

const id_compose_stepmessage1 = /** @type {(inputs: Compose_Stepmessage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pesan`)
};

/**
* | output |
* | --- |
* | "Message" |
*
* @param {Compose_Stepmessage1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepmessage1 = /** @type {((inputs?: Compose_Stepmessage1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepmessage1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_stepmessage1(inputs)
	return en_compose_stepmessage1(inputs)
});
export { compose_stepmessage1 as "compose.stepMessage" }