/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Unknownslothint2Inputs */

const en_compose_unknownslothint2 = /** @type {(inputs: Compose_Unknownslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No selected recipient has this field. Fix the placeholder or the recipients' data - sending would fail for everyone.`)
};

const id_compose_unknownslothint2 = /** @type {(inputs: Compose_Unknownslothint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima terpilih yang memiliki bidang ini. Perbaiki placeholder atau data penerima - pengiriman akan gagal untuk semua.`)
};

/**
* | output |
* | --- |
* | "No selected recipient has this field. Fix the placeholder or the recipients' data - sending would fail for everyone." |
*
* @param {Compose_Unknownslothint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslothint2 = /** @type {((inputs?: Compose_Unknownslothint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslothint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_unknownslothint2(inputs)
	return en_compose_unknownslothint2(inputs)
});
export { compose_unknownslothint2 as "compose.unknownSlotHint" }