/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Emailfixedretrying3Inputs */

const en_jobdetail_emailfixedretrying3 = /** @type {(inputs: Jobdetail_Emailfixedretrying3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Address fixed - retrying the send.`)
};

const id_jobdetail_emailfixedretrying3 = /** @type {(inputs: Jobdetail_Emailfixedretrying3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alamat diperbaiki - mencoba kirim ulang.`)
};

/**
* | output |
* | --- |
* | "Address fixed - retrying the send." |
*
* @param {Jobdetail_Emailfixedretrying3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_emailfixedretrying3 = /** @type {((inputs?: Jobdetail_Emailfixedretrying3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Emailfixedretrying3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_emailfixedretrying3(inputs)
	return en_jobdetail_emailfixedretrying3(inputs)
});
export { jobdetail_emailfixedretrying3 as "jobDetail.emailFixedRetrying" }