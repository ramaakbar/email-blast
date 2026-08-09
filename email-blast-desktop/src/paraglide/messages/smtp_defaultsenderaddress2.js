/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Defaultsenderaddress2Inputs */

const en_smtp_defaultsenderaddress2 = /** @type {(inputs: Smtp_Defaultsenderaddress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default sender address`)
};

const id_smtp_defaultsenderaddress2 = /** @type {(inputs: Smtp_Defaultsenderaddress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alamat pengirim bawaan`)
};

/**
* | output |
* | --- |
* | "Default sender address" |
*
* @param {Smtp_Defaultsenderaddress2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_defaultsenderaddress2 = /** @type {((inputs?: Smtp_Defaultsenderaddress2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Defaultsenderaddress2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_defaultsenderaddress2(inputs)
	return en_smtp_defaultsenderaddress2(inputs)
});
export { smtp_defaultsenderaddress2 as "smtp.defaultSenderAddress" }