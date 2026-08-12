/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Startdisabledrouting2Inputs */

const en_generate_startdisabledrouting2 = /** @type {(inputs: Generate_Startdisabledrouting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assign every template-column value to a template to generate.`)
};

const id_generate_startdisabledrouting2 = /** @type {(inputs: Generate_Startdisabledrouting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tetapkan setiap nilai kolom template ke sebuah template untuk membuat.`)
};

/**
* | output |
* | --- |
* | "Assign every template-column value to a template to generate." |
*
* @param {Generate_Startdisabledrouting2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_startdisabledrouting2 = /** @type {((inputs?: Generate_Startdisabledrouting2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Startdisabledrouting2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_startdisabledrouting2(inputs)
	return en_generate_startdisabledrouting2(inputs)
});
export { generate_startdisabledrouting2 as "generate.startDisabledRouting" }