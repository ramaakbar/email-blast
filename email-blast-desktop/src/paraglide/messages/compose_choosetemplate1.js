/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Choosetemplate1Inputs */

const en_compose_choosetemplate1 = /** @type {(inputs: Compose_Choosetemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a template…`)
};

const id_compose_choosetemplate1 = /** @type {(inputs: Compose_Choosetemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih template…`)
};

/**
* | output |
* | --- |
* | "Choose a template…" |
*
* @param {Compose_Choosetemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_choosetemplate1 = /** @type {((inputs?: Compose_Choosetemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Choosetemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_choosetemplate1(inputs)
	return en_compose_choosetemplate1(inputs)
});
export { compose_choosetemplate1 as "compose.chooseTemplate" }