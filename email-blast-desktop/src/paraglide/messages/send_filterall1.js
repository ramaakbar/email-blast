/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Filterall1Inputs */

const en_send_filterall1 = /** @type {(inputs: Send_Filterall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All`)
};

const id_send_filterall1 = /** @type {(inputs: Send_Filterall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua`)
};

/**
* | output |
* | --- |
* | "All" |
*
* @param {Send_Filterall1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_filterall1 = /** @type {((inputs?: Send_Filterall1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Filterall1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_filterall1(inputs)
	return en_send_filterall1(inputs)
});
export { send_filterall1 as "send.filterAll" }