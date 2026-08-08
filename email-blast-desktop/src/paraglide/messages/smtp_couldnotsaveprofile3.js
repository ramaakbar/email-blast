/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Couldnotsaveprofile3Inputs */

const en_smtp_couldnotsaveprofile3 = /** @type {(inputs: Smtp_Couldnotsaveprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the profile.`)
};

const id_smtp_couldnotsaveprofile3 = /** @type {(inputs: Smtp_Couldnotsaveprofile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menyimpan profil.`)
};

/**
* | output |
* | --- |
* | "Could not save the profile." |
*
* @param {Smtp_Couldnotsaveprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_couldnotsaveprofile3 = /** @type {((inputs?: Smtp_Couldnotsaveprofile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Couldnotsaveprofile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_couldnotsaveprofile3(inputs)
	return en_smtp_couldnotsaveprofile3(inputs)
});
export { smtp_couldnotsaveprofile3 as "smtp.couldNotSaveProfile" }