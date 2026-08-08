/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Noprofilesyet2Inputs */

const en_smtp_noprofilesyet2 = /** @type {(inputs: Smtp_Noprofilesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No SMTP profiles yet`)
};

const id_smtp_noprofilesyet2 = /** @type {(inputs: Smtp_Noprofilesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada profil SMTP`)
};

/**
* | output |
* | --- |
* | "No SMTP profiles yet" |
*
* @param {Smtp_Noprofilesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_noprofilesyet2 = /** @type {((inputs?: Smtp_Noprofilesyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Noprofilesyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_noprofilesyet2(inputs)
	return en_smtp_noprofilesyet2(inputs)
});
export { smtp_noprofilesyet2 as "smtp.noProfilesYet" }