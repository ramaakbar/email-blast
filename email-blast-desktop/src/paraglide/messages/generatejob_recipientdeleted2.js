/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Recipientdeleted2Inputs */

const en_generatejob_recipientdeleted2 = /** @type {(inputs: Generatejob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient no longer exists in the database.`)
};

const id_generatejob_recipientdeleted2 = /** @type {(inputs: Generatejob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima sudah tidak ada di database.`)
};

/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Generatejob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_recipientdeleted2 = /** @type {((inputs?: Generatejob_Recipientdeleted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Recipientdeleted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_recipientdeleted2(inputs)
	return en_generatejob_recipientdeleted2(inputs)
});
export { generatejob_recipientdeleted2 as "generateJob.recipientDeleted" }