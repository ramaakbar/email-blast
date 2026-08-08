/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Recipientdeleted2Inputs */

const en_sendjob_recipientdeleted2 = /** @type {(inputs: Sendjob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient no longer exists in the database.`)
};

const id_sendjob_recipientdeleted2 = /** @type {(inputs: Sendjob_Recipientdeleted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima sudah tidak ada di database.`)
};

/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Sendjob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_recipientdeleted2 = /** @type {((inputs?: Sendjob_Recipientdeleted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Recipientdeleted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_recipientdeleted2(inputs)
	return en_sendjob_recipientdeleted2(inputs)
});
export { sendjob_recipientdeleted2 as "sendJob.recipientDeleted" }