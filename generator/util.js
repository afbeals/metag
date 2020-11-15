/**
 * @name capitalize
 * @desc capitalize the first letter of each word
 * @param {String} str the string to capitalize
 * @return {String} the capitalized string
 * @example
 * const capital = capitalize('this string') // This String
 */
const capitalize = str =>
  str
    .split(' ')
    .map(s => `${s[0].toUpperCase()}${s.substring(1)}`)
    .join(' ');

/**
 * @name lowerFirst
 * @desc lower case the first letter of each word
 * @param {String} str the string to modify
 * @return {String} the modified string
 * @example
 * const lower = lowerFirst('ThisString') // ThisString
 */
const lowerFirst = str =>
  str
    .split(' ')
    .map(s => `${s[0].toLowerCase()}${s.substring(1)}`)
    .join(' ');

module.exports = {
  capitalize,
  lowerFirst,
};
