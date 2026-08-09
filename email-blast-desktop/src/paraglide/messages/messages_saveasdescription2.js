/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Saveasdescription2Inputs */

const en_messages_saveasdescription2 = /** @type {(inputs: Messages_Saveasdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current subject and body are saved as a new Message Template. Copy-on-pick: jobs that already picked it stay unchanged, and editing this template never changes this job.`)
};

const id_messages_saveasdescription2 = /** @type {(inputs: Messages_Saveasdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subjek dan isi saat ini disimpan sebagai Template Pesan baru. Salin-saat-dipilih: pekerjaan yang sudah memilihnya tetap tidak berubah, dan mengedit template ini tidak pernah mengubah pekerjaan ini.`)
};

/**
* | output |
* | --- |
* | "The current subject and body are saved as a new Message Template. Copy-on-pick: jobs that already picked it stay unchanged, and editing this template never c..." |
*
* @param {Messages_Saveasdescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_saveasdescription2 = /** @type {((inputs?: Messages_Saveasdescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Saveasdescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_saveasdescription2(inputs)
	return en_messages_saveasdescription2(inputs)
});
export { messages_saveasdescription2 as "messages.saveAsDescription" }