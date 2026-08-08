/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Windingdowntitle2Inputs */

const en_compose_windingdowntitle2 = /** @type {(inputs: Compose_Windingdowntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The in-flight email is finishing - resume in a moment`)
};

const id_compose_windingdowntitle2 = /** @type {(inputs: Compose_Windingdowntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email yang sedang dikirim sedang diselesaikan - lanjutkan sebentar lagi`)
};

/**
* | output |
* | --- |
* | "The in-flight email is finishing - resume in a moment" |
*
* @param {Compose_Windingdowntitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_windingdowntitle2 = /** @type {((inputs?: Compose_Windingdowntitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Windingdowntitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_windingdowntitle2(inputs)
	return en_compose_windingdowntitle2(inputs)
});
export { compose_windingdowntitle2 as "compose.windingDownTitle" }