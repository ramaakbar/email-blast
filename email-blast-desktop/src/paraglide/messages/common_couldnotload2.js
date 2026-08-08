/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotload2Inputs */

const en_common_couldnotload2 = /** @type {(inputs: Common_Couldnotload2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not load ${i?.key}.`)
};

const id_common_couldnotload2 = /** @type {(inputs: Common_Couldnotload2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Gagal memuat ${i?.key}.`)
};

/**
* | output |
* | --- |
* | "Could not load {key}." |
*
* @param {Common_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_couldnotload2 = /** @type {((inputs: Common_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_couldnotload2(inputs)
	return en_common_couldnotload2(inputs)
});
export { common_couldnotload2 as "common.couldNotLoad" }