/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_SubtitleInputs */

const en_welcome_subtitle = /** @type {(inputs: Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One last check before you start sending.`)
};

const id_welcome_subtitle = /** @type {(inputs: Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Satu pemeriksaan terakhir sebelum Anda mulai mengirim.`)
};

/**
* | output |
* | --- |
* | "One last check before you start sending." |
*
* @param {Welcome_SubtitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_subtitle = /** @type {((inputs?: Welcome_SubtitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_SubtitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_subtitle(inputs)
	return en_welcome_subtitle(inputs)
});
export { welcome_subtitle as "welcome.subtitle" }