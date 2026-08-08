/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredother2Inputs */

const en_templates_countregisteredother2 = /** @type {(inputs: Templates_Countregisteredother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} templates registered`)
};

const id_templates_countregisteredother2 = /** @type {(inputs: Templates_Countregisteredother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template terdaftar`)
};

/**
* | output |
* | --- |
* | "{count} templates registered" |
*
* @param {Templates_Countregisteredother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_countregisteredother2 = /** @type {((inputs: Templates_Countregisteredother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Countregisteredother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_countregisteredother2(inputs)
	return en_templates_countregisteredother2(inputs)
});
export { templates_countregisteredother2 as "templates.countRegisteredOther" }