/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Loadingpreview1Inputs */

const en_compose_loadingpreview1 = /** @type {(inputs: Compose_Loadingpreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading preview…`)
};

const id_compose_loadingpreview1 = /** @type {(inputs: Compose_Loadingpreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat pratinjau…`)
};

/**
* | output |
* | --- |
* | "Loading preview…" |
*
* @param {Compose_Loadingpreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_loadingpreview1 = /** @type {((inputs?: Compose_Loadingpreview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Loadingpreview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_loadingpreview1(inputs)
	return en_compose_loadingpreview1(inputs)
});
export { compose_loadingpreview1 as "compose.loadingPreview" }