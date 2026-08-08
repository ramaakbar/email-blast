/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Data1Inputs */

const en_settingspage_data1 = /** @type {(inputs: Settingspage_Data1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Data`)
};

const id_settingspage_data1 = /** @type {(inputs: Settingspage_Data1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Data`)
};

/**
* | output |
* | --- |
* | "Data" |
*
* @param {Settingspage_Data1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_data1 = /** @type {((inputs?: Settingspage_Data1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Data1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_data1(inputs)
	return en_settingspage_data1(inputs)
});
export { settingspage_data1 as "settingsPage.data" }