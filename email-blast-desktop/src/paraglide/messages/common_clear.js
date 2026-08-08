/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_ClearInputs */

const en_common_clear = /** @type {(inputs: Common_ClearInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear`)
};

const id_common_clear = /** @type {(inputs: Common_ClearInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bersihkan`)
};

/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Common_ClearInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_clear = /** @type {((inputs?: Common_ClearInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ClearInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_clear(inputs)
	return en_common_clear(inputs)
});
export { common_clear as "common.clear" }