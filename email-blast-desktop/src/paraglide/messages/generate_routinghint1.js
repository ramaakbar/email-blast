/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Routinghint1Inputs */

const en_generate_routinghint1 = /** @type {(inputs: Generate_Routinghint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick the column whose values decide which template each recipient is generated with.`)
};

const id_generate_routinghint1 = /** @type {(inputs: Generate_Routinghint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih kolom yang nilainya menentukan template untuk setiap penerima.`)
};

/**
* | output |
* | --- |
* | "Pick the column whose values decide which template each recipient is generated with." |
*
* @param {Generate_Routinghint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_routinghint1 = /** @type {((inputs?: Generate_Routinghint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Routinghint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_routinghint1(inputs)
	return en_generate_routinghint1(inputs)
});
export { generate_routinghint1 as "generate.routingHint" }