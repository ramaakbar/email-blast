/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Generatejobmissing3Inputs */

const en_sendjob_generatejobmissing3 = /** @type {(inputs: Sendjob_Generatejobmissing3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The generate job this send references no longer exists.`)
};

const id_sendjob_generatejobmissing3 = /** @type {(inputs: Sendjob_Generatejobmissing3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate job yang dirujuk pengiriman ini sudah tidak ada.`)
};

/**
* | output |
* | --- |
* | "The generate job this send references no longer exists." |
*
* @param {Sendjob_Generatejobmissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_generatejobmissing3 = /** @type {((inputs?: Sendjob_Generatejobmissing3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Generatejobmissing3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_generatejobmissing3(inputs)
	return en_sendjob_generatejobmissing3(inputs)
});
export { sendjob_generatejobmissing3 as "sendJob.generateJobMissing" }