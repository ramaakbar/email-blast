/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Keepmyslots2Inputs */

const en_templates_keepmyslots2 = /** @type {(inputs: Templates_Keepmyslots2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keep my slots`)
};

const id_templates_keepmyslots2 = /** @type {(inputs: Templates_Keepmyslots2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pertahankan slot saya`)
};

/**
* | output |
* | --- |
* | "Keep my slots" |
*
* @param {Templates_Keepmyslots2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_keepmyslots2 = /** @type {((inputs?: Templates_Keepmyslots2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Keepmyslots2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_keepmyslots2(inputs)
	return en_templates_keepmyslots2(inputs)
});
export { templates_keepmyslots2 as "templates.keepMySlots" }