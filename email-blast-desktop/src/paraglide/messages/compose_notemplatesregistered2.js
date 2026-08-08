/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Notemplatesregistered2Inputs */

const en_compose_notemplatesregistered2 = /** @type {(inputs: Compose_Notemplatesregistered2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No templates registered yet.`)
};

const id_compose_notemplatesregistered2 = /** @type {(inputs: Compose_Notemplatesregistered2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada template terdaftar.`)
};

/**
* | output |
* | --- |
* | "No templates registered yet." |
*
* @param {Compose_Notemplatesregistered2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_notemplatesregistered2 = /** @type {((inputs?: Compose_Notemplatesregistered2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Notemplatesregistered2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_notemplatesregistered2(inputs)
	return en_compose_notemplatesregistered2(inputs)
});
export { compose_notemplatesregistered2 as "compose.noTemplatesRegistered" }