/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Replyto1Inputs */

const en_smtp_replyto1 = /** @type {(inputs: Smtp_Replyto1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reply-to (optional)`)
};

const id_smtp_replyto1 = /** @type {(inputs: Smtp_Replyto1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Balas-ke (opsional)`)
};

/**
* | output |
* | --- |
* | "Reply-to (optional)" |
*
* @param {Smtp_Replyto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_replyto1 = /** @type {((inputs?: Smtp_Replyto1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Replyto1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_replyto1(inputs)
	return en_smtp_replyto1(inputs)
});
export { smtp_replyto1 as "smtp.replyTo" }