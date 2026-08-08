/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Compose_Previewfor1Inputs */

const en_compose_previewfor1 = /** @type {(inputs: Compose_Previewfor1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Preview for ${i?.name}`)
};

const id_compose_previewfor1 = /** @type {(inputs: Compose_Previewfor1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pratinjau untuk ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Preview for {name}" |
*
* @param {Compose_Previewfor1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_previewfor1 = /** @type {((inputs: Compose_Previewfor1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Previewfor1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_previewfor1(inputs)
	return en_compose_previewfor1(inputs)
});
export { compose_previewfor1 as "compose.previewFor" }