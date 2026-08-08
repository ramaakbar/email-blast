/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Validation_Templatepatternneedsslot3Inputs */

const en_validation_templatepatternneedsslot3 = /** @type {(inputs: Validation_Templatepatternneedsslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The output pattern must reference at least one slot, e.g. "LOA_${i?.name}.pdf".`)
};

const id_validation_templatepatternneedsslot3 = /** @type {(inputs: Validation_Templatepatternneedsslot3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pola output harus mereferensikan minimal satu slot, mis. "LOA_${i?.name}.pdf".`)
};

/**
* | output |
* | --- |
* | "The output pattern must reference at least one slot, e.g. \"LOA_{name}.pdf\"." |
*
* @param {Validation_Templatepatternneedsslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatepatternneedsslot3 = /** @type {((inputs: Validation_Templatepatternneedsslot3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatepatternneedsslot3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_templatepatternneedsslot3(inputs)
	return en_validation_templatepatternneedsslot3(inputs)
});
export { validation_templatepatternneedsslot3 as "validation.templatePatternNeedsSlot" }