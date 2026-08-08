/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Passwordlabel1Inputs */

const en_smtp_passwordlabel1 = /** @type {(inputs: Smtp_Passwordlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`password`)
};

const id_smtp_passwordlabel1 = /** @type {(inputs: Smtp_Passwordlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`kata sandi`)
};

/**
* | output |
* | --- |
* | "password" |
*
* @param {Smtp_Passwordlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_passwordlabel1 = /** @type {((inputs?: Smtp_Passwordlabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Passwordlabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_passwordlabel1(inputs)
	return en_smtp_passwordlabel1(inputs)
});
export { smtp_passwordlabel1 as "smtp.passwordLabel" }