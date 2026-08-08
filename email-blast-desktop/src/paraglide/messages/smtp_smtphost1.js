/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Smtphost1Inputs */

const en_smtp_smtphost1 = /** @type {(inputs: Smtp_Smtphost1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP host`)
};

const id_smtp_smtphost1 = /** @type {(inputs: Smtp_Smtphost1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Host SMTP`)
};

/**
* | output |
* | --- |
* | "SMTP host" |
*
* @param {Smtp_Smtphost1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_smtphost1 = /** @type {((inputs?: Smtp_Smtphost1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Smtphost1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_smtphost1(inputs)
	return en_smtp_smtphost1(inputs)
});
export { smtp_smtphost1 as "smtp.smtpHost" }