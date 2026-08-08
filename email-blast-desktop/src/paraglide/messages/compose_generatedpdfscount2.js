/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Generatedpdfscount2Inputs */

const en_compose_generatedpdfscount2 = /** @type {(inputs: Compose_Generatedpdfscount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} generated PDFs`)
};

const id_compose_generatedpdfscount2 = /** @type {(inputs: Compose_Generatedpdfscount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} PDF hasil generate`)
};

/**
* | output |
* | --- |
* | "{count} generated PDFs" |
*
* @param {Compose_Generatedpdfscount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedpdfscount2 = /** @type {((inputs: Compose_Generatedpdfscount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedpdfscount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generatedpdfscount2(inputs)
	return en_compose_generatedpdfscount2(inputs)
});
export { compose_generatedpdfscount2 as "compose.generatedPdfsCount" }