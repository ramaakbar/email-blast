/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Implicittls1Inputs */

const en_smtp_implicittls1 = /** @type {(inputs: Smtp_Implicittls1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Implicit TLS`)
};

const id_smtp_implicittls1 = /** @type {(inputs: Smtp_Implicittls1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TLS Implisit`)
};

/**
* | output |
* | --- |
* | "Implicit TLS" |
*
* @param {Smtp_Implicittls1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_implicittls1 = /** @type {((inputs?: Smtp_Implicittls1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Implicittls1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_implicittls1(inputs)
	return en_smtp_implicittls1(inputs)
});
export { smtp_implicittls1 as "smtp.implicitTls" }