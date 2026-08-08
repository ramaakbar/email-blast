/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_SlotsInputs */

const en_templates_slots = /** @type {(inputs: Templates_SlotsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slots`)
};

const id_templates_slots = /** @type {(inputs: Templates_SlotsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slot`)
};

/**
* | output |
* | --- |
* | "Slots" |
*
* @param {Templates_SlotsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slots = /** @type {((inputs?: Templates_SlotsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_SlotsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slots(inputs)
	return en_templates_slots(inputs)
});
export { templates_slots as "templates.slots" }