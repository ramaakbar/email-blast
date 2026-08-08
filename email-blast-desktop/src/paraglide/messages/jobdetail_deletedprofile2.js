/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Deletedprofile2Inputs */

const en_jobdetail_deletedprofile2 = /** @type {(inputs: Jobdetail_Deletedprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(deleted profile)`)
};

const id_jobdetail_deletedprofile2 = /** @type {(inputs: Jobdetail_Deletedprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(profil dihapus)`)
};

/**
* | output |
* | --- |
* | "(deleted profile)" |
*
* @param {Jobdetail_Deletedprofile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_deletedprofile2 = /** @type {((inputs?: Jobdetail_Deletedprofile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Deletedprofile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_deletedprofile2(inputs)
	return en_jobdetail_deletedprofile2(inputs)
});
export { jobdetail_deletedprofile2 as "jobDetail.deletedProfile" }