/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Couldnotfixemail4Inputs */

const en_jobdetail_couldnotfixemail4 = /** @type {(inputs: Jobdetail_Couldnotfixemail4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not fix the email.`)
};

const id_jobdetail_couldnotfixemail4 = /** @type {(inputs: Jobdetail_Couldnotfixemail4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memperbaiki email.`)
};

/**
* | output |
* | --- |
* | "Could not fix the email." |
*
* @param {Jobdetail_Couldnotfixemail4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_couldnotfixemail4 = /** @type {((inputs?: Jobdetail_Couldnotfixemail4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Couldnotfixemail4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_couldnotfixemail4(inputs)
	return en_jobdetail_couldnotfixemail4(inputs)
});
export { jobdetail_couldnotfixemail4 as "jobDetail.couldNotFixEmail" }