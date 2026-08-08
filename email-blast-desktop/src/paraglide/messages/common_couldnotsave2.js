/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ key: NonNullable<unknown> }} Common_Couldnotsave2Inputs */

const en_common_couldnotsave2 = /** @type {(inputs: Common_Couldnotsave2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not save ${i?.key}.`)
};

const id_common_couldnotsave2 = /** @type {(inputs: Common_Couldnotsave2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Gagal menyimpan ${i?.key}.`)
};

/**
* | output |
* | --- |
* | "Could not save {key}." |
*
* @param {Common_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_couldnotsave2 = /** @type {((inputs: Common_Couldnotsave2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Couldnotsave2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_couldnotsave2(inputs)
	return en_common_couldnotsave2(inputs)
});
export { common_couldnotsave2 as "common.couldNotSave" }