/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_PrevInputs */

const en_common_prev = /** @type {(inputs: Common_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prev`)
};

const id_common_prev = /** @type {(inputs: Common_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sebelumnya`)
};

/**
* | output |
* | --- |
* | "Prev" |
*
* @param {Common_PrevInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_prev = /** @type {((inputs?: Common_PrevInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PrevInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_prev(inputs)
	return en_common_prev(inputs)
});
export { common_prev as "common.prev" }