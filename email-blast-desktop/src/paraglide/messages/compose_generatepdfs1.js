/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Generatepdfs1Inputs */

const en_compose_generatepdfs1 = /** @type {(inputs: Compose_Generatepdfs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate PDFs`)
};

const id_compose_generatepdfs1 = /** @type {(inputs: Compose_Generatepdfs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate PDF`)
};

/**
* | output |
* | --- |
* | "Generate PDFs" |
*
* @param {Compose_Generatepdfs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatepdfs1 = /** @type {((inputs?: Compose_Generatepdfs1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatepdfs1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generatepdfs1(inputs)
	return en_compose_generatepdfs1(inputs)
});
export { compose_generatepdfs1 as "compose.generatePdfs" }