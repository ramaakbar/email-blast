/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Nosavedprofileshint3Inputs */

const en_compose_nosavedprofileshint3 = /** @type {(inputs: Compose_Nosavedprofileshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No saved profiles yet - switch to "Enter details" and use "Save as profile", or add one in`)
};

const id_compose_nosavedprofileshint3 = /** @type {(inputs: Compose_Nosavedprofileshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada profil tersimpan - pilih "Isi detail" lalu gunakan "Simpan sebagai profil", atau tambahkan di`)
};

/**
* | output |
* | --- |
* | "No saved profiles yet - switch to \"Enter details\" and use \"Save as profile\", or add one in" |
*
* @param {Compose_Nosavedprofileshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_nosavedprofileshint3 = /** @type {((inputs?: Compose_Nosavedprofileshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Nosavedprofileshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_nosavedprofileshint3(inputs)
	return en_compose_nosavedprofileshint3(inputs)
});
export { compose_nosavedprofileshint3 as "compose.noSavedProfilesHint" }