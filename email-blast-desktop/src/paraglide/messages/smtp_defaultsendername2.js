/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Defaultsendername2Inputs */

const en_smtp_defaultsendername2 = /** @type {(inputs: Smtp_Defaultsendername2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default sender name`)
};

const id_smtp_defaultsendername2 = /** @type {(inputs: Smtp_Defaultsendername2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama pengirim bawaan`)
};

/**
* | output |
* | --- |
* | "Default sender name" |
*
* @param {Smtp_Defaultsendername2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_defaultsendername2 = /** @type {((inputs?: Smtp_Defaultsendername2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Defaultsendername2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_defaultsendername2(inputs)
	return en_smtp_defaultsendername2(inputs)
});
export { smtp_defaultsendername2 as "smtp.defaultSenderName" }