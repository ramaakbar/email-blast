/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_SavedInputs */

const en_common_saved = /** @type {(inputs: Common_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved`)
};

const id_common_saved = /** @type {(inputs: Common_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tersimpan`)
};

/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Common_SavedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_saved = /** @type {((inputs?: Common_SavedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SavedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_saved(inputs)
	return en_common_saved(inputs)
});
export { common_saved as "common.saved" }