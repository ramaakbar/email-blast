/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_DescriptionInputs */

const en_compose_description = /** @type {(inputs: Compose_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick who receives the documents, write the message, and send the emails.`)
};

const id_compose_description = /** @type {(inputs: Compose_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih siapa yang menerima dokumen, tulis pesan, dan kirim emailnya.`)
};

/**
* | output |
* | --- |
* | "Pick who receives the documents, write the message, and send the emails." |
*
* @param {Compose_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_description = /** @type {((inputs?: Compose_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_description(inputs)
	return en_compose_description(inputs)
});
export { compose_description as "compose.description" }