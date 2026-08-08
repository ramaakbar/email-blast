/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Bodylabel1Inputs */

const en_compose_bodylabel1 = /** @type {(inputs: Compose_Bodylabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTML body - type { to insert a recipient field`)
};

const id_compose_bodylabel1 = /** @type {(inputs: Compose_Bodylabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi HTML - ketik { untuk menyisipkan bidang penerima`)
};

/**
* | output |
* | --- |
* | "HTML body - type { to insert a recipient field" |
*
* @param {Compose_Bodylabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_bodylabel1 = /** @type {((inputs?: Compose_Bodylabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Bodylabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_bodylabel1(inputs)
	return en_compose_bodylabel1(inputs)
});
export { compose_bodylabel1 as "compose.bodyLabel" }