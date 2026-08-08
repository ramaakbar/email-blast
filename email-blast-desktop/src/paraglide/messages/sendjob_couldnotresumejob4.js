/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Couldnotresumejob4Inputs */

const en_sendjob_couldnotresumejob4 = /** @type {(inputs: Sendjob_Couldnotresumejob4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not resume this job.`)
};

const id_sendjob_couldnotresumejob4 = /** @type {(inputs: Sendjob_Couldnotresumejob4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat melanjutkan pekerjaan ini.`)
};

/**
* | output |
* | --- |
* | "Could not resume this job." |
*
* @param {Sendjob_Couldnotresumejob4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_couldnotresumejob4 = /** @type {((inputs?: Sendjob_Couldnotresumejob4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Couldnotresumejob4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_couldnotresumejob4(inputs)
	return en_sendjob_couldnotresumejob4(inputs)
});
export { sendjob_couldnotresumejob4 as "sendJob.couldNotResumeJob" }