/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Saveprofile1Inputs */

const en_smtp_saveprofile1 = /** @type {(inputs: Smtp_Saveprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save profile`)
};

const id_smtp_saveprofile1 = /** @type {(inputs: Smtp_Saveprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan profil`)
};

/**
* | output |
* | --- |
* | "Save profile" |
*
* @param {Smtp_Saveprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_saveprofile1 = /** @type {((inputs?: Smtp_Saveprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Saveprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_saveprofile1(inputs)
	return en_smtp_saveprofile1(inputs)
});
export { smtp_saveprofile1 as "smtp.saveProfile" }