/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_ScanningInputs */

const en_templates_scanning = /** @type {(inputs: Templates_ScanningInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scanning…`)
};

const id_templates_scanning = /** @type {(inputs: Templates_ScanningInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memindai…`)
};

/**
* | output |
* | --- |
* | "Scanning…" |
*
* @param {Templates_ScanningInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_scanning = /** @type {((inputs?: Templates_ScanningInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_ScanningInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_scanning(inputs)
	return en_templates_scanning(inputs)
});
export { templates_scanning as "templates.scanning" }