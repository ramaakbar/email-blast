/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Requiredslots1Inputs */

const en_compose_requiredslots1 = /** @type {(inputs: Compose_Requiredslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Required slots`)
};

const id_compose_requiredslots1 = /** @type {(inputs: Compose_Requiredslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slot wajib`)
};

/**
* | output |
* | --- |
* | "Required slots" |
*
* @param {Compose_Requiredslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_requiredslots1 = /** @type {((inputs?: Compose_Requiredslots1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Requiredslots1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_requiredslots1(inputs)
	return en_compose_requiredslots1(inputs)
});
export { compose_requiredslots1 as "compose.requiredSlots" }