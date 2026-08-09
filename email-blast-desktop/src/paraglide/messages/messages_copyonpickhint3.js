/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Copyonpickhint3Inputs */

const en_messages_copyonpickhint3 = /** @type {(inputs: Messages_Copyonpickhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy-on-pick: a job that picked this template keeps its own copy - editing it here never changes a job, and editing a job's message never changes this template.`)
};

const id_messages_copyonpickhint3 = /** @type {(inputs: Messages_Copyonpickhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Salin-saat-dipilih: pekerjaan yang memilih template ini menyimpan salinannya sendiri - mengeditnya di sini tidak pernah mengubah pekerjaan, dan mengedit pesan pekerjaan tidak pernah mengubah template ini.`)
};

/**
* | output |
* | --- |
* | "Copy-on-pick: a job that picked this template keeps its own copy - editing it here never changes a job, and editing a job's message never changes this template." |
*
* @param {Messages_Copyonpickhint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_copyonpickhint3 = /** @type {((inputs?: Messages_Copyonpickhint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Copyonpickhint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_copyonpickhint3(inputs)
	return en_messages_copyonpickhint3(inputs)
});
export { messages_copyonpickhint3 as "messages.copyOnPickHint" }