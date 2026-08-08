/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountother3Inputs */

const en_compose_slotmissingcountother3 = /** @type {(inputs: Compose_Slotmissingcountother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} recipients`)
};

const id_compose_slotmissingcountother3 = /** @type {(inputs: Compose_Slotmissingcountother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} penerima`)
};

/**
* | output |
* | --- |
* | "{slot} - {count} recipients" |
*
* @param {Compose_Slotmissingcountother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_slotmissingcountother3 = /** @type {((inputs: Compose_Slotmissingcountother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Slotmissingcountother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_slotmissingcountother3(inputs)
	return en_compose_slotmissingcountother3(inputs)
});
export { compose_slotmissingcountother3 as "compose.slotMissingCountOther" }