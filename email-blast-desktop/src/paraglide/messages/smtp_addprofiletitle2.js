/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Addprofiletitle2Inputs */

const en_smtp_addprofiletitle2 = /** @type {(inputs: Smtp_Addprofiletitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add SMTP profile`)
};

const id_smtp_addprofiletitle2 = /** @type {(inputs: Smtp_Addprofiletitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah profil SMTP`)
};

/**
* | output |
* | --- |
* | "Add SMTP profile" |
*
* @param {Smtp_Addprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_addprofiletitle2 = /** @type {((inputs?: Smtp_Addprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Addprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_addprofiletitle2(inputs)
	return en_smtp_addprofiletitle2(inputs)
});
export { smtp_addprofiletitle2 as "smtp.addProfileTitle" }