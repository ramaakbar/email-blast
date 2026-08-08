/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Livepreviewhintother3Inputs */

const en_compose_livepreviewhintother3 = /** @type {(inputs: Compose_Livepreviewhintother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rendered for the first ${i?.count} selected recipients - the message updates as you type.`)
};

const id_compose_livepreviewhintother3 = /** @type {(inputs: Compose_Livepreviewhintother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dirender untuk ${i?.count} penerima terpilih pertama - pesan diperbarui saat Anda mengetik.`)
};

/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipients - the message updates as you type." |
*
* @param {Compose_Livepreviewhintother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreviewhintother3 = /** @type {((inputs: Compose_Livepreviewhintother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreviewhintother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_livepreviewhintother3(inputs)
	return en_compose_livepreviewhintother3(inputs)
});
export { compose_livepreviewhintother3 as "compose.livePreviewHintOther" }