/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ms: NonNullable<unknown> }} Settingspage_Msperemail3Inputs */

const en_settingspage_msperemail3 = /** @type {(inputs: Settingspage_Msperemail3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms per email`)
};

const id_settingspage_msperemail3 = /** @type {(inputs: Settingspage_Msperemail3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ms} ms per email`)
};

/**
* | output |
* | --- |
* | "{ms} ms per email" |
*
* @param {Settingspage_Msperemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_msperemail3 = /** @type {((inputs: Settingspage_Msperemail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Msperemail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_msperemail3(inputs)
	return en_settingspage_msperemail3(inputs)
});
export { settingspage_msperemail3 as "settingsPage.msPerEmail" }