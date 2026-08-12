/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fontsservice_Invalidfontfile3Inputs */

const en_fontsservice_invalidfontfile3 = /** @type {(inputs: Fontsservice_Invalidfontfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`That is not a readable TTF/OTF font file.`)
};

const id_fontsservice_invalidfontfile3 = /** @type {(inputs: Fontsservice_Invalidfontfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Itu bukan file huruf TTF/OTF yang dapat dibaca.`)
};

/**
* | output |
* | --- |
* | "That is not a readable TTF/OTF font file." |
*
* @param {Fontsservice_Invalidfontfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const fontsservice_invalidfontfile3 = /** @type {((inputs?: Fontsservice_Invalidfontfile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fontsservice_Invalidfontfile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_fontsservice_invalidfontfile3(inputs)
	return en_fontsservice_invalidfontfile3(inputs)
});
export { fontsservice_invalidfontfile3 as "fontsService.invalidFontFile" }