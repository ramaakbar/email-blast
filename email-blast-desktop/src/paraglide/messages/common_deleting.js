/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_DeletingInputs */

const en_common_deleting = /** @type {(inputs: Common_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deleting…`)
};

const id_common_deleting = /** @type {(inputs: Common_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menghapus…`)
};

/**
* | output |
* | --- |
* | "Deleting…" |
*
* @param {Common_DeletingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_deleting = /** @type {((inputs?: Common_DeletingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_DeletingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_deleting(inputs)
	return en_common_deleting(inputs)
});
export { common_deleting as "common.deleting" }