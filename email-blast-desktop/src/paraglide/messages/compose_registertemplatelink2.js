/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Registertemplatelink2Inputs */

const en_compose_registertemplatelink2 = /** @type {(inputs: Compose_Registertemplatelink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register a template`)
};

const id_compose_registertemplatelink2 = /** @type {(inputs: Compose_Registertemplatelink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daftarkan template`)
};

/**
* | output |
* | --- |
* | "Register a template" |
*
* @param {Compose_Registertemplatelink2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_registertemplatelink2 = /** @type {((inputs?: Compose_Registertemplatelink2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Registertemplatelink2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_registertemplatelink2(inputs)
	return en_compose_registertemplatelink2(inputs)
});
export { compose_registertemplatelink2 as "compose.registerTemplateLink" }