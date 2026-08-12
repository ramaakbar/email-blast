/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, names: NonNullable<unknown> }} Generatejob_Unassignedtemplatevalues3Inputs */

const en_generatejob_unassignedtemplatevalues3 = /** @type {(inputs: Generatejob_Unassignedtemplatevalues3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Cannot generate: ${i?.count} recipients have a template-column value that is not assigned to any template: ${i?.names}.`)
};

const id_generatejob_unassignedtemplatevalues3 = /** @type {(inputs: Generatejob_Unassignedtemplatevalues3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Tidak dapat membuat: ${i?.count} penerima memiliki nilai kolom template yang belum ditetapkan ke template mana pun: ${i?.names}.`)
};

/**
* | output |
* | --- |
* | "Cannot generate: {count} recipients have a template-column value that is not assigned to any template: {names}." |
*
* @param {Generatejob_Unassignedtemplatevalues3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_unassignedtemplatevalues3 = /** @type {((inputs: Generatejob_Unassignedtemplatevalues3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Unassignedtemplatevalues3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_unassignedtemplatevalues3(inputs)
	return en_generatejob_unassignedtemplatevalues3(inputs)
});
export { generatejob_unassignedtemplatevalues3 as "generateJob.unassignedTemplateValues" }