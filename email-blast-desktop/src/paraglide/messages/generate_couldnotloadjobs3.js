/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Couldnotloadjobs3Inputs */

const en_generate_couldnotloadjobs3 = /** @type {(inputs: Generate_Couldnotloadjobs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load past generate jobs.`)
};

const id_generate_couldnotloadjobs3 = /** @type {(inputs: Generate_Couldnotloadjobs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat memuat riwayat generate.`)
};

/**
* | output |
* | --- |
* | "Could not load past generate jobs." |
*
* @param {Generate_Couldnotloadjobs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_couldnotloadjobs3 = /** @type {((inputs?: Generate_Couldnotloadjobs3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Couldnotloadjobs3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_couldnotloadjobs3(inputs)
	return en_generate_couldnotloadjobs3(inputs)
});
export { generate_couldnotloadjobs3 as "generate.couldNotLoadJobs" }