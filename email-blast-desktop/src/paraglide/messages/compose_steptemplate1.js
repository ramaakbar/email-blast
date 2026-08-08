/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Steptemplate1Inputs */

const en_compose_steptemplate1 = /** @type {(inputs: Compose_Steptemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_compose_steptemplate1 = /** @type {(inputs: Compose_Steptemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_Steptemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_steptemplate1 = /** @type {((inputs?: Compose_Steptemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Steptemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_steptemplate1(inputs)
	return en_compose_steptemplate1(inputs)
});
export { compose_steptemplate1 as "compose.stepTemplate" }