/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Stepsend1Inputs */

const en_compose_stepsend1 = /** @type {(inputs: Compose_Stepsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send`)
};

const id_compose_stepsend1 = /** @type {(inputs: Compose_Stepsend1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim`)
};

/**
* | output |
* | --- |
* | "Send" |
*
* @param {Compose_Stepsend1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_stepsend1 = /** @type {((inputs?: Compose_Stepsend1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Stepsend1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_stepsend1(inputs)
	return en_compose_stepsend1(inputs)
});
export { compose_stepsend1 as "compose.stepSend" }