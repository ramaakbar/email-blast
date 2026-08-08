/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Compose_Selectrecipient1Inputs */

const en_compose_selectrecipient1 = /** @type {(inputs: Compose_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select ${i?.name}`)
};

const id_compose_selectrecipient1 = /** @type {(inputs: Compose_Selectrecipient1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pilih ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Compose_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectrecipient1 = /** @type {((inputs: Compose_Selectrecipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectrecipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_selectrecipient1(inputs)
	return en_compose_selectrecipient1(inputs)
});
export { compose_selectrecipient1 as "compose.selectRecipient" }