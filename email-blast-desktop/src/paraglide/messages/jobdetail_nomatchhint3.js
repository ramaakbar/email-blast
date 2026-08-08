/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Nomatchhint3Inputs */

const en_jobdetail_nomatchhint3 = /** @type {(inputs: Jobdetail_Nomatchhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different name, email, or status.`)
};

const id_jobdetail_nomatchhint3 = /** @type {(inputs: Jobdetail_Nomatchhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coba nama, email, atau status lain.`)
};

/**
* | output |
* | --- |
* | "Try a different name, email, or status." |
*
* @param {Jobdetail_Nomatchhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_nomatchhint3 = /** @type {((inputs?: Jobdetail_Nomatchhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Nomatchhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_nomatchhint3(inputs)
	return en_jobdetail_nomatchhint3(inputs)
});
export { jobdetail_nomatchhint3 as "jobDetail.noMatchHint" }