/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Messagelooksgood2Inputs */

const en_compose_messagelooksgood2 = /** @type {(inputs: Compose_Messagelooksgood2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message looks good`)
};

const id_compose_messagelooksgood2 = /** @type {(inputs: Compose_Messagelooksgood2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pesan terlihat baik`)
};

/**
* | output |
* | --- |
* | "Message looks good" |
*
* @param {Compose_Messagelooksgood2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_messagelooksgood2 = /** @type {((inputs?: Compose_Messagelooksgood2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Messagelooksgood2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_messagelooksgood2(inputs)
	return en_compose_messagelooksgood2(inputs)
});
export { compose_messagelooksgood2 as "compose.messageLooksGood" }