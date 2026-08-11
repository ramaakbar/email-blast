/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Jobnolongerexists3Inputs */

const en_generate_jobnolongerexists3 = /** @type {(inputs: Generate_Jobnolongerexists3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This generate job no longer exists.`)
};

const id_generate_jobnolongerexists3 = /** @type {(inputs: Generate_Jobnolongerexists3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan generate ini sudah tidak ada.`)
};

/**
* | output |
* | --- |
* | "This generate job no longer exists." |
*
* @param {Generate_Jobnolongerexists3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_jobnolongerexists3 = /** @type {((inputs?: Generate_Jobnolongerexists3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Jobnolongerexists3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_jobnolongerexists3(inputs)
	return en_generate_jobnolongerexists3(inputs)
});
export { generate_jobnolongerexists3 as "generate.jobNoLongerExists" }