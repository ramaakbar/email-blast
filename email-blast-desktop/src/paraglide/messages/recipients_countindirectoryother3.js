/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryother3Inputs */

const en_recipients_countindirectoryother3 = /** @type {(inputs: Recipients_Countindirectoryother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients in the directory`)
};

const id_recipients_countindirectoryother3 = /** @type {(inputs: Recipients_Countindirectoryother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima di direktori`)
};

/**
* | output |
* | --- |
* | "{count} recipients in the directory" |
*
* @param {Recipients_Countindirectoryother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_countindirectoryother3 = /** @type {((inputs: Recipients_Countindirectoryother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Countindirectoryother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_countindirectoryother3(inputs)
	return en_recipients_countindirectoryother3(inputs)
});
export { recipients_countindirectoryother3 as "recipients.countInDirectoryOther" }