/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_TemplateInputs */

const en_compose_template = /** @type {(inputs: Compose_TemplateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_compose_template = /** @type {(inputs: Compose_TemplateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Compose_TemplateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_template = /** @type {((inputs?: Compose_TemplateInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_TemplateInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_template(inputs)
	return en_compose_template(inputs)
});
export { compose_template as "compose.template" }