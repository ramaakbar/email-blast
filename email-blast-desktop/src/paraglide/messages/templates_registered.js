/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_RegisteredInputs */

const en_templates_registered = /** @type {(inputs: Templates_RegisteredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registered`)
};

const id_templates_registered = /** @type {(inputs: Templates_RegisteredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Terdaftar`)
};

/**
* | output |
* | --- |
* | "Registered" |
*
* @param {Templates_RegisteredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_registered = /** @type {((inputs?: Templates_RegisteredInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_RegisteredInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_registered(inputs)
	return en_templates_registered(inputs)
});
export { templates_registered as "templates.registered" }