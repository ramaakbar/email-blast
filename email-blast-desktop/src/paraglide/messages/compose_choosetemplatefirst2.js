/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Choosetemplatefirst2Inputs */

const en_compose_choosetemplatefirst2 = /** @type {(inputs: Compose_Choosetemplatefirst2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go back and choose a template first.`)
};

const id_compose_choosetemplatefirst2 = /** @type {(inputs: Compose_Choosetemplatefirst2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kembali dan pilih template dulu.`)
};

/**
* | output |
* | --- |
* | "Go back and choose a template first." |
*
* @param {Compose_Choosetemplatefirst2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_choosetemplatefirst2 = /** @type {((inputs?: Compose_Choosetemplatefirst2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Choosetemplatefirst2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_choosetemplatefirst2(inputs)
	return en_compose_choosetemplatefirst2(inputs)
});
export { compose_choosetemplatefirst2 as "compose.chooseTemplateFirst" }