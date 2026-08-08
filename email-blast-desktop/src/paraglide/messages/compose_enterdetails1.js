/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Enterdetails1Inputs */

const en_compose_enterdetails1 = /** @type {(inputs: Compose_Enterdetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter details (this job only)`)
};

const id_compose_enterdetails1 = /** @type {(inputs: Compose_Enterdetails1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi detail (khusus pekerjaan ini)`)
};

/**
* | output |
* | --- |
* | "Enter details (this job only)" |
*
* @param {Compose_Enterdetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_enterdetails1 = /** @type {((inputs?: Compose_Enterdetails1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Enterdetails1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_enterdetails1(inputs)
	return en_compose_enterdetails1(inputs)
});
export { compose_enterdetails1 as "compose.enterDetails" }