/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Closedetails1Inputs */

const en_common_closedetails1 = /** @type {(inputs: Common_Closedetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close details`)
};

const id_common_closedetails1 = /** @type {(inputs: Common_Closedetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tutup detail`)
};

/**
* | output |
* | --- |
* | "Close details" |
*
* @param {Common_Closedetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_closedetails1 = /** @type {((inputs?: Common_Closedetails1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Closedetails1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_closedetails1(inputs)
	return en_common_closedetails1(inputs)
});
export { common_closedetails1 as "common.closeDetails" }