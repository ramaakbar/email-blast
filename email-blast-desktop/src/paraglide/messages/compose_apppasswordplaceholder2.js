/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Apppasswordplaceholder2Inputs */

const en_compose_apppasswordplaceholder2 = /** @type {(inputs: Compose_Apppasswordplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`16-character app password`)
};

const id_compose_apppasswordplaceholder2 = /** @type {(inputs: Compose_Apppasswordplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password 16 karakter`)
};

/**
* | output |
* | --- |
* | "16-character app password" |
*
* @param {Compose_Apppasswordplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_apppasswordplaceholder2 = /** @type {((inputs?: Compose_Apppasswordplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Apppasswordplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_apppasswordplaceholder2(inputs)
	return en_compose_apppasswordplaceholder2(inputs)
});
export { compose_apppasswordplaceholder2 as "compose.appPasswordPlaceholder" }