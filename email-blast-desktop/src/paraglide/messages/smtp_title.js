/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_TitleInputs */

const en_smtp_title = /** @type {(inputs: Smtp_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP profiles`)
};

const id_smtp_title = /** @type {(inputs: Smtp_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profil SMTP`)
};

/**
* | output |
* | --- |
* | "SMTP profiles" |
*
* @param {Smtp_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_title = /** @type {((inputs?: Smtp_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_title(inputs)
	return en_smtp_title(inputs)
});
export { smtp_title as "smtp.title" }