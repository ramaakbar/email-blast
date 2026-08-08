/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown>, instansi: NonNullable<unknown> }} Compose_Subjectplaceholder1Inputs */

const en_compose_subjectplaceholder1 = /** @type {(inputs: Compose_Subjectplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`LOA for ${i?.name} - ${i?.instansi}`)
};

const id_compose_subjectplaceholder1 = /** @type {(inputs: Compose_Subjectplaceholder1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`LOA untuk ${i?.name} - ${i?.instansi}`)
};

/**
* | output |
* | --- |
* | "LOA for {name} - {instansi}" |
*
* @param {Compose_Subjectplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_subjectplaceholder1 = /** @type {((inputs: Compose_Subjectplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Subjectplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_subjectplaceholder1(inputs)
	return en_compose_subjectplaceholder1(inputs)
});
export { compose_subjectplaceholder1 as "compose.subjectPlaceholder" }