/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_AttachmentsInputs */

const en_compose_attachments = /** @type {(inputs: Compose_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Attachments`)
};

const id_compose_attachments = /** @type {(inputs: Compose_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lampiran`)
};

/**
* | output |
* | --- |
* | "Attachments" |
*
* @param {Compose_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_attachments = /** @type {((inputs?: Compose_AttachmentsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_AttachmentsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_attachments(inputs)
	return en_compose_attachments(inputs)
});
export { compose_attachments as "compose.attachments" }