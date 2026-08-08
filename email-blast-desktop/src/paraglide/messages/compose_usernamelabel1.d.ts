export { compose_usernamelabel1 as "compose.usernameLabel" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Usernamelabel1Inputs = {};
/**
* | output |
* | --- |
* | "Username (email address)" |
*
* @param {Compose_Usernamelabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_usernamelabel1: ((inputs?: Compose_Usernamelabel1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Usernamelabel1Inputs, {
    locale?: "en" | "id";
}, {}>;
