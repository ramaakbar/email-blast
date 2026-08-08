/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Connectionfailed1Inputs */

const en_smtp_connectionfailed1 = /** @type {(inputs: Smtp_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection failed.`)
};

const id_smtp_connectionfailed1 = /** @type {(inputs: Smtp_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Koneksi gagal.`)
};

/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Smtp_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connectionfailed1 = /** @type {((inputs?: Smtp_Connectionfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Connectionfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_connectionfailed1(inputs)
	return en_smtp_connectionfailed1(inputs)
});
export { smtp_connectionfailed1 as "smtp.connectionFailed" }