/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Editexternallyhint2Inputs */

const en_templates_editexternallyhint2 = /** @type {(inputs: Templates_Editexternallyhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit the template file itself in Word (DOCX) or Figma/Photoshop (images) - Email Blast fills it exactly as saved.`)
};

const id_templates_editexternallyhint2 = /** @type {(inputs: Templates_Editexternallyhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit file template di Word (DOCX) atau Figma/Photoshop (gambar) - Email Blast mengisinya sesuai yang tersimpan.`)
};

/**
* | output |
* | --- |
* | "Edit the template file itself in Word (DOCX) or Figma/Photoshop (images) - Email Blast fills it exactly as saved." |
*
* @param {Templates_Editexternallyhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_editexternallyhint2 = /** @type {((inputs?: Templates_Editexternallyhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Editexternallyhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_editexternallyhint2(inputs)
	return en_templates_editexternallyhint2(inputs)
});
export { templates_editexternallyhint2 as "templates.editExternallyHint" }