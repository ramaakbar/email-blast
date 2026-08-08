/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_StarttlsInputs */

const en_smtp_starttls = /** @type {(inputs: Smtp_StarttlsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`STARTTLS`)
};

const id_smtp_starttls = /** @type {(inputs: Smtp_StarttlsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`STARTTLS`)
};

/**
* | output |
* | --- |
* | "STARTTLS" |
*
* @param {Smtp_StarttlsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_starttls = /** @type {((inputs?: Smtp_StarttlsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_StarttlsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_starttls(inputs)
	return en_smtp_starttls(inputs)
});
export { smtp_starttls as "smtp.starttls" }