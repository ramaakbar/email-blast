/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Recipientdeletednoedit4Inputs */

const en_jobdetail_recipientdeletednoedit4 = /** @type {(inputs: Jobdetail_Recipientdeletednoedit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This recipient was deleted - the row is read-only.`)
};

const id_jobdetail_recipientdeletednoedit4 = /** @type {(inputs: Jobdetail_Recipientdeletednoedit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima ini telah dihapus - baris ini hanya bisa dibaca.`)
};

/**
* | output |
* | --- |
* | "This recipient was deleted - the row is read-only." |
*
* @param {Jobdetail_Recipientdeletednoedit4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_recipientdeletednoedit4 = /** @type {((inputs?: Jobdetail_Recipientdeletednoedit4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Recipientdeletednoedit4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_recipientdeletednoedit4(inputs)
	return en_jobdetail_recipientdeletednoedit4(inputs)
});
export { jobdetail_recipientdeletednoedit4 as "jobDetail.recipientDeletedNoEdit" }