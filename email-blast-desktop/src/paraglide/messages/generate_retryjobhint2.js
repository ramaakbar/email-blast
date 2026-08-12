/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Retryjobhint2Inputs */

const en_generate_retryjobhint2 = /** @type {(inputs: Generate_Retryjobhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pre-fill the workspace with this job's recipients and template`)
};

const id_generate_retryjobhint2 = /** @type {(inputs: Generate_Retryjobhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi awal ruang kerja dengan penerima dan template pekerjaan ini`)
};

/**
* | output |
* | --- |
* | "Pre-fill the workspace with this job's recipients and template" |
*
* @param {Generate_Retryjobhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_retryjobhint2 = /** @type {((inputs?: Generate_Retryjobhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Retryjobhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_retryjobhint2(inputs)
	return en_generate_retryjobhint2(inputs)
});
export { generate_retryjobhint2 as "generate.retryJobHint" }