/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ page: NonNullable<unknown>, count: NonNullable<unknown> }} Recipients_Pageof1Inputs */

const en_recipients_pageof1 = /** @type {(inputs: Recipients_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Page ${i?.page} of ${i?.count}`)
};

const id_recipients_pageof1 = /** @type {(inputs: Recipients_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Halaman ${i?.page} dari ${i?.count}`)
};

/**
* | output |
* | --- |
* | "Page {page} of {count}" |
*
* @param {Recipients_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_pageof1 = /** @type {((inputs: Recipients_Pageof1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Pageof1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_pageof1(inputs)
	return en_recipients_pageof1(inputs)
});
export { recipients_pageof1 as "recipients.pageOf" }