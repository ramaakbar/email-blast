/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_GeneratingInputs */

const en_compose_generating = /** @type {(inputs: Compose_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating…`)
};

const id_compose_generating = /** @type {(inputs: Compose_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Membuat…`)
};

/**
* | output |
* | --- |
* | "Generating…" |
*
* @param {Compose_GeneratingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generating = /** @type {((inputs?: Compose_GeneratingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_GeneratingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generating(inputs)
	return en_compose_generating(inputs)
});
export { compose_generating as "compose.generating" }