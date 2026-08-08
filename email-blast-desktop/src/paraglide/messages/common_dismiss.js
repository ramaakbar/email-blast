/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_DismissInputs */

const en_common_dismiss = /** @type {(inputs: Common_DismissInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const id_common_dismiss = /** @type {(inputs: Common_DismissInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tutup`)
};

/**
* | output |
* | --- |
* | "Dismiss" |
*
* @param {Common_DismissInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_dismiss = /** @type {((inputs?: Common_DismissInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DismissInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_dismiss(inputs)
	return en_common_dismiss(inputs)
});
export { common_dismiss as "common.dismiss" }