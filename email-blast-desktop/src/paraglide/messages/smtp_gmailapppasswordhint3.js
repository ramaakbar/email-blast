/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Gmailapppasswordhint3Inputs */

const en_smtp_gmailapppasswordhint3 = /** @type {(inputs: Smtp_Gmailapppasswordhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gmail: generate a 16-character app password with 2-step verification enabled.`)
};

const id_smtp_gmailapppasswordhint3 = /** @type {(inputs: Smtp_Gmailapppasswordhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gmail: buat app password 16 karakter dengan verifikasi dua langkah aktif.`)
};

/**
* | output |
* | --- |
* | "Gmail: generate a 16-character app password with 2-step verification enabled." |
*
* @param {Smtp_Gmailapppasswordhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_gmailapppasswordhint3 = /** @type {((inputs?: Smtp_Gmailapppasswordhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Gmailapppasswordhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_gmailapppasswordhint3(inputs)
	return en_smtp_gmailapppasswordhint3(inputs)
});
export { smtp_gmailapppasswordhint3 as "smtp.gmailAppPasswordHint" }