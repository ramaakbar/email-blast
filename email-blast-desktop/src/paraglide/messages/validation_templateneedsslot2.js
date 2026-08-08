/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Templateneedsslot2Inputs */

const en_validation_templateneedsslot2 = /** @type {(inputs: Validation_Templateneedsslot2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A template needs at least one slot.`)
};

const id_validation_templateneedsslot2 = /** @type {(inputs: Validation_Templateneedsslot2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template membutuhkan minimal satu slot.`)
};

/**
* | output |
* | --- |
* | "A template needs at least one slot." |
*
* @param {Validation_Templateneedsslot2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templateneedsslot2 = /** @type {((inputs?: Validation_Templateneedsslot2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templateneedsslot2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_templateneedsslot2(inputs)
	return en_validation_templateneedsslot2(inputs)
});
export { validation_templateneedsslot2 as "validation.templateNeedsSlot" }