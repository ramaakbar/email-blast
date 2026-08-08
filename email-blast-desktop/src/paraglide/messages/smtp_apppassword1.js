/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Apppassword1Inputs */

const en_smtp_apppassword1 = /** @type {(inputs: Smtp_Apppassword1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password`)
};

const id_smtp_apppassword1 = /** @type {(inputs: Smtp_Apppassword1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kata sandi aplikasi`)
};

/**
* | output |
* | --- |
* | "App password" |
*
* @param {Smtp_Apppassword1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_apppassword1 = /** @type {((inputs?: Smtp_Apppassword1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Apppassword1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_apppassword1(inputs)
	return en_smtp_apppassword1(inputs)
});
export { smtp_apppassword1 as "smtp.appPassword" }