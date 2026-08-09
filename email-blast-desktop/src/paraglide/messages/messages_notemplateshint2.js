/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Notemplateshint2Inputs */

const en_messages_notemplateshint2 = /** @type {(inputs: Messages_Notemplateshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save a subject and body you reuse - picking it in a send job copies it into the job, where you can edit it freely.`)
};

const id_messages_notemplateshint2 = /** @type {(inputs: Messages_Notemplateshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan subjek dan isi yang sering dipakai - memilihnya di kirim pekerjaan akan menyalinnya ke pekerjaan, tempat Anda dapat mengeditnya dengan bebas.`)
};

/**
* | output |
* | --- |
* | "Save a subject and body you reuse - picking it in a send job copies it into the job, where you can edit it freely." |
*
* @param {Messages_Notemplateshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_notemplateshint2 = /** @type {((inputs?: Messages_Notemplateshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Notemplateshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_notemplateshint2(inputs)
	return en_messages_notemplateshint2(inputs)
});
export { messages_notemplateshint2 as "messages.noTemplatesHint" }