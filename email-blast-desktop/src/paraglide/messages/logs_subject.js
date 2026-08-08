/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_SubjectInputs */

const en_logs_subject = /** @type {(inputs: Logs_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject`)
};

const id_logs_subject = /** @type {(inputs: Logs_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subjek`)
};

/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Logs_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_subject = /** @type {((inputs?: Logs_SubjectInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_SubjectInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_subject(inputs)
	return en_logs_subject(inputs)
});
export { logs_subject as "logs.subject" }