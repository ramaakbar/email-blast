/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Deleteprofiledescription2Inputs */

const en_smtp_deleteprofiledescription2 = /** @type {(inputs: Smtp_Deleteprofiledescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The profile and its stored password are removed from the app.`)
};

const id_smtp_deleteprofiledescription2 = /** @type {(inputs: Smtp_Deleteprofiledescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profil dan kata sandi tersimpannya dihapus dari aplikasi.`)
};

/**
* | output |
* | --- |
* | "The profile and its stored password are removed from the app." |
*
* @param {Smtp_Deleteprofiledescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_deleteprofiledescription2 = /** @type {((inputs?: Smtp_Deleteprofiledescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Deleteprofiledescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_deleteprofiledescription2(inputs)
	return en_smtp_deleteprofiledescription2(inputs)
});
export { smtp_deleteprofiledescription2 as "smtp.deleteProfileDescription" }