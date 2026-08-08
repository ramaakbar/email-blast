/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintone3Inputs */

const en_compose_livepreviewhintone3 = /** @type {(inputs: Compose_Livepreviewhintone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rendered for the first ${i?.count} selected recipient - the message updates as you type.`)
};

const id_compose_livepreviewhintone3 = /** @type {(inputs: Compose_Livepreviewhintone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dirender untuk ${i?.count} penerima terpilih pertama - pesan diperbarui saat Anda mengetik.`)
};

/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipient - the message updates as you type." |
*
* @param {Compose_Livepreviewhintone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreviewhintone3 = /** @type {((inputs: Compose_Livepreviewhintone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreviewhintone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_livepreviewhintone3(inputs)
	return en_compose_livepreviewhintone3(inputs)
});
export { compose_livepreviewhintone3 as "compose.livePreviewHintOne" }