/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Templatelabel1Inputs */

const en_compose_templatelabel1 = /** @type {(inputs: Compose_Templatelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Letter or certificate template`)
};

const id_compose_templatelabel1 = /** @type {(inputs: Compose_Templatelabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template surat atau sertifikat`)
};

/**
* | output |
* | --- |
* | "Letter or certificate template" |
*
* @param {Compose_Templatelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_templatelabel1 = /** @type {((inputs?: Compose_Templatelabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Templatelabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_templatelabel1(inputs)
	return en_compose_templatelabel1(inputs)
});
export { compose_templatelabel1 as "compose.templateLabel" }