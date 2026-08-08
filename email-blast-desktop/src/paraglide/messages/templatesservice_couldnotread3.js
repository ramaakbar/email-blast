/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ path: NonNullable<unknown>, detail: NonNullable<unknown> }} Templatesservice_Couldnotread3Inputs */

const en_templatesservice_couldnotread3 = /** @type {(inputs: Templatesservice_Couldnotread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Could not read "${i?.path}": ${i?.detail}`)
};

const id_templatesservice_couldnotread3 = /** @type {(inputs: Templatesservice_Couldnotread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Tidak dapat membaca "${i?.path}": ${i?.detail}`)
};

/**
* | output |
* | --- |
* | "Could not read \"{path}\": {detail}" |
*
* @param {Templatesservice_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templatesservice_couldnotread3 = /** @type {((inputs: Templatesservice_Couldnotread3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templatesservice_Couldnotread3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templatesservice_couldnotread3(inputs)
	return en_templatesservice_couldnotread3(inputs)
});
export { templatesservice_couldnotread3 as "templatesService.couldNotRead" }