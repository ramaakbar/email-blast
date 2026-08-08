/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Steprecipients1Inputs */

const en_compose_steprecipients1 = /** @type {(inputs: Compose_Steprecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

const id_compose_steprecipients1 = /** @type {(inputs: Compose_Steprecipients1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima`)
};

/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_Steprecipients1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_steprecipients1 = /** @type {((inputs?: Compose_Steprecipients1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Steprecipients1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_steprecipients1(inputs)
	return en_compose_steprecipients1(inputs)
});
export { compose_steprecipients1 as "compose.stepRecipients" }