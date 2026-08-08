/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Preparingsend1Inputs */

const en_compose_preparingsend1 = /** @type {(inputs: Compose_Preparingsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preparing the send…`)
};

const id_compose_preparingsend1 = /** @type {(inputs: Compose_Preparingsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menyiapkan pengiriman…`)
};

/**
* | output |
* | --- |
* | "Preparing the send…" |
*
* @param {Compose_Preparingsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_preparingsend1 = /** @type {((inputs?: Compose_Preparingsend1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Preparingsend1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_preparingsend1(inputs)
	return en_compose_preparingsend1(inputs)
});
export { compose_preparingsend1 as "compose.preparingSend" }