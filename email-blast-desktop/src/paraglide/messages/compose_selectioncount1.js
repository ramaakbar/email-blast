/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ selected: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Selectioncount1Inputs */

const en_compose_selectioncount1 = /** @type {(inputs: Compose_Selectioncount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.selected} selected · ${i?.total} matching`)
};

const id_compose_selectioncount1 = /** @type {(inputs: Compose_Selectioncount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.selected} dipilih · ${i?.total} cocok`)
};

/**
* | output |
* | --- |
* | "{selected} selected · {total} matching" |
*
* @param {Compose_Selectioncount1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectioncount1 = /** @type {((inputs: Compose_Selectioncount1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectioncount1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_selectioncount1(inputs)
	return en_compose_selectioncount1(inputs)
});
export { compose_selectioncount1 as "compose.selectionCount" }