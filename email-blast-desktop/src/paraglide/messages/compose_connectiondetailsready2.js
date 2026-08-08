/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Connectiondetailsready2Inputs */

const en_compose_connectiondetailsready2 = /** @type {(inputs: Compose_Connectiondetailsready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection details ready`)
};

const id_compose_connectiondetailsready2 = /** @type {(inputs: Compose_Connectiondetailsready2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Detail koneksi siap`)
};

/**
* | output |
* | --- |
* | "Connection details ready" |
*
* @param {Compose_Connectiondetailsready2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connectiondetailsready2 = /** @type {((inputs?: Compose_Connectiondetailsready2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Connectiondetailsready2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_connectiondetailsready2(inputs)
	return en_compose_connectiondetailsready2(inputs)
});
export { compose_connectiondetailsready2 as "compose.connectionDetailsReady" }