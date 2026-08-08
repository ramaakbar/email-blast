/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Createhint1Inputs */

const en_smtp_createhint1 = /** @type {(inputs: Smtp_Createhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save your SMTP server details to reuse in every campaign.`)
};

const id_smtp_createhint1 = /** @type {(inputs: Smtp_Createhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan detail server SMTP Anda untuk dipakai ulang di setiap kampanye.`)
};

/**
* | output |
* | --- |
* | "Save your SMTP server details to reuse in every campaign." |
*
* @param {Smtp_Createhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_createhint1 = /** @type {((inputs?: Smtp_Createhint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Createhint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_createhint1(inputs)
	return en_smtp_createhint1(inputs)
});
export { smtp_createhint1 as "smtp.createHint" }