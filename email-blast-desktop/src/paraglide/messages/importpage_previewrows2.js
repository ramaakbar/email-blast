/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown>, shown: NonNullable<unknown>, total: NonNullable<unknown> }} Importpage_Previewrows2Inputs */

const en_importpage_previewrows2 = /** @type {(inputs: Importpage_Previewrows2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} - showing ${i?.shown} of ${i?.total} rows`)
};

const id_importpage_previewrows2 = /** @type {(inputs: Importpage_Previewrows2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} - menampilkan ${i?.shown} dari ${i?.total} baris`)
};

/**
* | output |
* | --- |
* | "{fileName} - showing {shown} of {total} rows" |
*
* @param {Importpage_Previewrows2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_previewrows2 = /** @type {((inputs: Importpage_Previewrows2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Previewrows2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_previewrows2(inputs)
	return en_importpage_previewrows2(inputs)
});
export { importpage_previewrows2 as "importPage.previewRows" }