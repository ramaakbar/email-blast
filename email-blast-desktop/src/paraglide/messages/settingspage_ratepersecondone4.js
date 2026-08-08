/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondone4Inputs */

const en_settingspage_ratepersecondone4 = /** @type {(inputs: Settingspage_Ratepersecondone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} email per second`)
};

const id_settingspage_ratepersecondone4 = /** @type {(inputs: Settingspage_Ratepersecondone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} email per detik`)
};

/**
* | output |
* | --- |
* | "{rate} email per second" |
*
* @param {Settingspage_Ratepersecondone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratepersecondone4 = /** @type {((inputs: Settingspage_Ratepersecondone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratepersecondone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_ratepersecondone4(inputs)
	return en_settingspage_ratepersecondone4(inputs)
});
export { settingspage_ratepersecondone4 as "settingsPage.ratePerSecondOne" }