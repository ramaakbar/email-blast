/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Nogeneratedattachments2Inputs */

const en_compose_nogeneratedattachments2 = /** @type {(inputs: Compose_Nogeneratedattachments2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients have a generated attachment - go back and generate the PDFs first.`)
};

const id_compose_nogeneratedattachments2 = /** @type {(inputs: Compose_Nogeneratedattachments2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima dengan lampiran hasil generate - kembali dan buat PDF dulu.`)
};

/**
* | output |
* | --- |
* | "No recipients have a generated attachment - go back and generate the PDFs first." |
*
* @param {Compose_Nogeneratedattachments2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_nogeneratedattachments2 = /** @type {((inputs?: Compose_Nogeneratedattachments2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Nogeneratedattachments2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_nogeneratedattachments2(inputs)
	return en_compose_nogeneratedattachments2(inputs)
});
export { compose_nogeneratedattachments2 as "compose.noGeneratedAttachments" }