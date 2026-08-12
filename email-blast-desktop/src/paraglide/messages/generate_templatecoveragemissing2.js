/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ missing: NonNullable<unknown>, count: NonNullable<unknown> }} Generate_Templatecoveragemissing2Inputs */

const en_generate_templatecoveragemissing2 = /** @type {(inputs: Generate_Templatecoveragemissing2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.missing} of ${i?.count} recipients routed to this template are missing data for:`)
};

const id_generate_templatecoveragemissing2 = /** @type {(inputs: Generate_Templatecoveragemissing2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.missing} dari ${i?.count} penerima yang dirutekan ke template ini kekurangan data untuk:`)
};

/**
* | output |
* | --- |
* | "{missing} of {count} recipients routed to this template are missing data for:" |
*
* @param {Generate_Templatecoveragemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_templatecoveragemissing2 = /** @type {((inputs: Generate_Templatecoveragemissing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Templatecoveragemissing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_templatecoveragemissing2(inputs)
	return en_generate_templatecoveragemissing2(inputs)
});
export { generate_templatecoveragemissing2 as "generate.templateCoverageMissing" }