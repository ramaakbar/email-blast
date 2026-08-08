/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Templatemissing2Inputs */

const en_generatejob_templatemissing2 = /** @type {(inputs: Generatejob_Templatemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The template no longer exists.`)
};

const id_generatejob_templatemissing2 = /** @type {(inputs: Generatejob_Templatemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template sudah tidak ada.`)
};

/**
* | output |
* | --- |
* | "The template no longer exists." |
*
* @param {Generatejob_Templatemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_templatemissing2 = /** @type {((inputs?: Generatejob_Templatemissing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Templatemissing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_templatemissing2(inputs)
	return en_generatejob_templatemissing2(inputs)
});
export { generatejob_templatemissing2 as "generateJob.templateMissing" }