/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_GeneratingInputs */

const en_status_generating = /** @type {(inputs: Status_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating`)
};

const id_status_generating = /** @type {(inputs: Status_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memproses`)
};

/**
* | output |
* | --- |
* | "Generating" |
*
* @param {Status_GeneratingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_generating = /** @type {((inputs?: Status_GeneratingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_GeneratingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_generating(inputs)
	return en_status_generating(inputs)
});
export { status_generating as "status.generating" }