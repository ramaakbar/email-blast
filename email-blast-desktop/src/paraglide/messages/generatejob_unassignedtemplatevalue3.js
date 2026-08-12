/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ value: NonNullable<unknown> }} Generatejob_Unassignedtemplatevalue3Inputs */

const en_generatejob_unassignedtemplatevalue3 = /** @type {(inputs: Generatejob_Unassignedtemplatevalue3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template-column value "${i?.value}" is not assigned to any template.`)
};

const id_generatejob_unassignedtemplatevalue3 = /** @type {(inputs: Generatejob_Unassignedtemplatevalue3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Nilai kolom template "${i?.value}" belum ditetapkan ke template mana pun.`)
};

/**
* | output |
* | --- |
* | "Template-column value \"{value}\" is not assigned to any template." |
*
* @param {Generatejob_Unassignedtemplatevalue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_unassignedtemplatevalue3 = /** @type {((inputs: Generatejob_Unassignedtemplatevalue3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Unassignedtemplatevalue3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_unassignedtemplatevalue3(inputs)
	return en_generatejob_unassignedtemplatevalue3(inputs)
});
export { generatejob_unassignedtemplatevalue3 as "generateJob.unassignedTemplateValue" }