/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Deletedescription1Inputs */

const en_recipients_deletedescription1 = /** @type {(inputs: Recipients_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`They will be removed from the directory. Past job history is kept.`)
};

const id_recipients_deletedescription1 = /** @type {(inputs: Recipients_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mereka akan dihapus dari direktori. Riwayat pekerjaan lama tetap disimpan.`)
};

/**
* | output |
* | --- |
* | "They will be removed from the directory. Past job history is kept." |
*
* @param {Recipients_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletedescription1 = /** @type {((inputs?: Recipients_Deletedescription1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletedescription1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deletedescription1(inputs)
	return en_recipients_deletedescription1(inputs)
});
export { recipients_deletedescription1 as "recipients.deleteDescription" }