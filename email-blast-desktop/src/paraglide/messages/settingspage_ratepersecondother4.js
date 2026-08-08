/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ rate: NonNullable<unknown> }} Settingspage_Ratepersecondother4Inputs */

const en_settingspage_ratepersecondother4 = /** @type {(inputs: Settingspage_Ratepersecondother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} emails per second`)
};

const id_settingspage_ratepersecondother4 = /** @type {(inputs: Settingspage_Ratepersecondother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.rate} email per detik`)
};

/**
* | output |
* | --- |
* | "{rate} emails per second" |
*
* @param {Settingspage_Ratepersecondother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratepersecondother4 = /** @type {((inputs: Settingspage_Ratepersecondother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratepersecondother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_ratepersecondother4(inputs)
	return en_settingspage_ratepersecondother4(inputs)
});
export { settingspage_ratepersecondother4 as "settingsPage.ratePerSecondOther" }