/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Testconnection1Inputs */

const en_smtp_testconnection1 = /** @type {(inputs: Smtp_Testconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Test connection`)
};

const id_smtp_testconnection1 = /** @type {(inputs: Smtp_Testconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uji koneksi`)
};

/**
* | output |
* | --- |
* | "Test connection" |
*
* @param {Smtp_Testconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_testconnection1 = /** @type {((inputs?: Smtp_Testconnection1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Testconnection1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_testconnection1(inputs)
	return en_smtp_testconnection1(inputs)
});
export { smtp_testconnection1 as "smtp.testConnection" }