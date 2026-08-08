/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Livepreview1Inputs */

const en_compose_livepreview1 = /** @type {(inputs: Compose_Livepreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live preview`)
};

const id_compose_livepreview1 = /** @type {(inputs: Compose_Livepreview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pratinjau langsung`)
};

/**
* | output |
* | --- |
* | "Live preview" |
*
* @param {Compose_Livepreview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_livepreview1 = /** @type {((inputs?: Compose_Livepreview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Livepreview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_livepreview1(inputs)
	return en_compose_livepreview1(inputs)
});
export { compose_livepreview1 as "compose.livePreview" }