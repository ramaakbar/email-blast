/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_GeneratedInputs */

const en_status_generated = /** @type {(inputs: Status_GeneratedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated`)
};

const id_status_generated = /** @type {(inputs: Status_GeneratedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selesai`)
};

/**
* | output |
* | --- |
* | "Generated" |
*
* @param {Status_GeneratedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_generated = /** @type {((inputs?: Status_GeneratedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_GeneratedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_generated(inputs)
	return en_status_generated(inputs)
});
export { status_generated as "status.generated" }