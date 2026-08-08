/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Templates_Countregisteredone2Inputs */

const en_templates_countregisteredone2 = /** @type {(inputs: Templates_Countregisteredone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template registered`)
};

const id_templates_countregisteredone2 = /** @type {(inputs: Templates_Countregisteredone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template terdaftar`)
};

/**
* | output |
* | --- |
* | "{count} template registered" |
*
* @param {Templates_Countregisteredone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_countregisteredone2 = /** @type {((inputs: Templates_Countregisteredone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Countregisteredone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_countregisteredone2(inputs)
	return en_templates_countregisteredone2(inputs)
});
export { templates_countregisteredone2 as "templates.countRegisteredOne" }