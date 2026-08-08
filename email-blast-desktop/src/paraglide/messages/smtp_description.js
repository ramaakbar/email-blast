/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_DescriptionInputs */

const en_smtp_description = /** @type {(inputs: Smtp_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved sender identities the compose wizard can pick from. Passwords are stored locally and never shown.`)
};

const id_smtp_description = /** @type {(inputs: Smtp_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Identitas pengirim tersimpan yang bisa dipilih wizard compose. Kata sandi disimpan secara lokal dan tidak pernah ditampilkan.`)
};

/**
* | output |
* | --- |
* | "Saved sender identities the compose wizard can pick from. Passwords are stored locally and never shown." |
*
* @param {Smtp_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_description = /** @type {((inputs?: Smtp_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_description(inputs)
	return en_smtp_description(inputs)
});
export { smtp_description as "smtp.description" }