/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_SubjectInputs */

const en_compose_subject = /** @type {(inputs: Compose_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject`)
};

const id_compose_subject = /** @type {(inputs: Compose_SubjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subjek`)
};

/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Compose_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_subject = /** @type {((inputs?: Compose_SubjectInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SubjectInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_subject(inputs)
	return en_compose_subject(inputs)
});
export { compose_subject as "compose.subject" }