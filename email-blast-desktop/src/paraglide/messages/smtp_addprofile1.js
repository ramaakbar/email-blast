/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Addprofile1Inputs */

const en_smtp_addprofile1 = /** @type {(inputs: Smtp_Addprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add profile`)
};

const id_smtp_addprofile1 = /** @type {(inputs: Smtp_Addprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah profil`)
};

/**
* | output |
* | --- |
* | "Add profile" |
*
* @param {Smtp_Addprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_addprofile1 = /** @type {((inputs?: Smtp_Addprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Addprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_addprofile1(inputs)
	return en_smtp_addprofile1(inputs)
});
export { smtp_addprofile1 as "smtp.addProfile" }