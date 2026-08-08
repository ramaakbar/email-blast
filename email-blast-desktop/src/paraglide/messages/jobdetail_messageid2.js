/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Messageid2Inputs */

const en_jobdetail_messageid2 = /** @type {(inputs: Jobdetail_Messageid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message ID`)
};

const id_jobdetail_messageid2 = /** @type {(inputs: Jobdetail_Messageid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ID Pesan`)
};

/**
* | output |
* | --- |
* | "Message ID" |
*
* @param {Jobdetail_Messageid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_messageid2 = /** @type {((inputs?: Jobdetail_Messageid2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Messageid2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_messageid2(inputs)
	return en_jobdetail_messageid2(inputs)
});
export { jobdetail_messageid2 as "jobDetail.messageId" }