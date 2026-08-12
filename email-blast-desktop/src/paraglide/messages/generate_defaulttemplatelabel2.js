/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Defaulttemplatelabel2Inputs */

const en_generate_defaulttemplatelabel2 = /** @type {(inputs: Generate_Defaulttemplatelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default template (blank values)`)
};

const id_generate_defaulttemplatelabel2 = /** @type {(inputs: Generate_Defaulttemplatelabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template default (nilai kosong)`)
};

/**
* | output |
* | --- |
* | "Default template (blank values)" |
*
* @param {Generate_Defaulttemplatelabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_defaulttemplatelabel2 = /** @type {((inputs?: Generate_Defaulttemplatelabel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Defaulttemplatelabel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_defaulttemplatelabel2(inputs)
	return en_generate_defaulttemplatelabel2(inputs)
});
export { generate_defaulttemplatelabel2 as "generate.defaultTemplateLabel" }