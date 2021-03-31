// Local

// Helpers
/**
 * @function _helperGetDate
 * @description normalize ISO date to pass as params to Date
 * @param {Array} date date params
 * @return {Date} date String
 */
export const _helperGetDate = date => {
  if (!date) return null;
  if (date instanceof Date) return new Date(date);
  if (date[2].length > 2) {
    // rejoin, most likely full ISO date string
    return new Date(date.join('-'));
  }
  return new Date(date[0], parseInt(date[1], 10) - 1, date[2]);
};

/**
 * @function _helperIsLeapYear
 * @description check if year is a leap year
 * @param {Object} param
 * @param {Number} param.year The current year to check
 * @return {Boolean}
 * @example
 * const isLeapYear = _helperIsLeapYear({ year: '2020-02-02'});
 */
export const _helperIsLeapYear = ({ year }) =>
  // TODO: add month boundary
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

/**
 * @function _helperIsValid
 * @description check if string passed is a useable ISO date
 * @param {String} ISOdate the date to check
 * @param {String} [name] the name to use in the error message
 * @return {Boolean}
 */
export const _helperIsValid = (ISOdate, name) => {
  const reg = new RegExp(/^(\d{4})-(\d{2})-(\d{2})(.)*$/);
  const isValid =
    reg.test(ISOdate) &&
    !Number.isNaN(Date.parse(ISOdate)) &&
    ISOdate.split('-').length === 3;
  if (!isValid) {
    throw new TypeError(
      `Invalid date of ${ISOdate} passed to date function${
        name ? ` ${name}` : ''
        // eslint-disable-next-line max-len
      }. Please check the value is in ISO format. Example: '2020-02-02 or 2020-02-02T00:00:00.000Z'`
    );
  }
};

// Functions
/**
 * @function addDateTime
 * @desc add time to specified dateTime
 * @param {Object} params
 * @param {String} params.dateTime ISO dateTime to add to
 * @param {Number} [params.years] amount of years to add
 * @param {Number} [params.months] amount of months to add
 * @param {Number} [params.days] amount of days to add
 * @param {Number} [params.hours] amount of hours to add
 * @param {Number} [params.minutes] amount of minutes to add
 * @param {Number} [params.seconds] amount of seconds to add
 * @return {String} The updated date
 * @example
 * const params = {
 *    dateTime: '2020-02-02'},
 *    years: 5,
 *    minutes: 20
 * }
 *
 * const updatedDateTime = addDateTime(params);
 */
export const addDateTime = ({ dateTime, ...rest }) => {
  _helperIsValid(dateTime, 'addDateTime');
  let currentDT = new Date(dateTime);
  const options = {
    years: (date, amt) => date.setFullYear(date.getFullYear() + amt),
    months: (date, amt) => date.setMonth(date.getMonth() + amt),
    days: (date, amt) => date.setDate(date.getDate() + amt),
    hours: (date, amt) => date.setHours(date.getHours() + amt),
    minutes: (date, amt) => date.setMinutes(date.getMinutes() + amt),
    seconds: (date, amt) => date.setSeconds(date.getSeconds() + amt),
  };
  Object.entries(options).forEach(([key, func]) => {
    const value = rest[key];
    if (value) {
      currentDT = new Date(func(currentDT, value));
    }
  });
  return currentDT.toISOString();
};

/**
 * @function format
 * @description format string. *Note: using '[]' tells function to ignore
 * @param {Object} param
 * @param {String} param.date ISO date to use to replace values
 * @param {String} param.str The string with values to replace
 * @param {String} [param.locale] the locale of the date
 * @example
 * Accepted format options:
 *  YYYY returns: '2014'
 *  YY returns: '14'
 *  MMMM returns: 'February'
 *  MMM returns: 'Feb'
 *  MM returns: '2'
 *  DDD returns: 'Sunday'
 *  DD returns: '02'
 *  D returns: '2'
 *
 *  const dateString = format({ date: '2020-02-02', str: "Yes, today's [D]ate is MMM. D, YYYY", locale: 'us-en' });
 * // Yes, today's date is Feb. 02, 2020
 */
export const format = ({ date, str, locale = 'use-EN' }) => {
  if (!date || !str) return '';
  _helperIsValid(date, 'format: date');
  const myDate = new Date(date);
  const options = {
    YYYY: () =>
      new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(myDate),
    YY: () =>
      new Intl.DateTimeFormat(locale, { year: '2-digit' }).format(myDate),
    MMMM: () =>
      new Intl.DateTimeFormat(locale, { month: 'long' }).format(myDate),
    MMM: () =>
      new Intl.DateTimeFormat(locale, { month: 'short' }).format(myDate),
    MM: () =>
      new Intl.DateTimeFormat(locale, { month: '2-digit' }).format(myDate),
    DDD: () =>
      myDate.toLocaleDateString(locale, { weekday: 'long' }).format(myDate),
    DD: () =>
      new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(myDate),
    D: () => new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(myDate),
    // Do: Day of the month with numeric ordinal contraction '1st',
    // Q: 1..4 Quarter of year. Sets month to first month in quarter.
  };
  const optionStr = Object.keys(options).join('|');
  const regStr = `(?<!\\[)\\b(${optionStr})\\b(?![\\w\\s]*[\\]])`;
  const reg = new RegExp(regStr, 'g');
  const retStr = str.replace(reg, matched => {
    if (typeof options[matched] === 'function') {
      return options[matched]();
    }
    return options[matched];
  });

  return retStr.replace(/\[|\]/g, '');
};

/**
 * @function getDiff
 * @description get  the difference between values
 * @param {String} a ISO date beginning date
 * @param {String} b ISO date ending date
 * @return {Object} the difference in ms, and difference in times
 * @example
 *
 * const { ms, times: { days }} = getDiff('2020-01-01', '2020-02-02');
 */
export const getDiff = (a, b) => {
  // millieseconds
  _helperIsValid(a, 'getDiff a');
  _helperIsValid(b, 'getDiff b');

  const aDate = new Date(a);
  const bDate = new Date(b);
  const aYear = +aDate.getFullYear();
  const bYear = +bDate.getFullYear();
  const diff = aDate - bDate;
  const getStartYear = aYear > bYear ? aYear : bYear;
  const adjustForLeap = Array.from(
    { length: Math.abg(aYear - bYear + 1) },
    (_, i) => getStartYear - i
  ).reduce((p, c) => p + (_helperIsLeapYear(c) ? 1 : 0), 0);
  // TODO: adjust to include months
  const t = Math.abs(diff);
  const cy = 365 * 24 * 60 * 60 * 100; // year calc
  const cd = 24 * 60 * 60 * 1000; // day calc
  const ch = 60 * 60 * 1000; // hour calc

  let years = Math.floor(t / (cy + adjustForLeap * cd)); // years
  let days = Math.floor((t - years * cy - adjustForLeap * cd) / cd); // day
  let hours = Math.floor(
    (t - days * cd - years * cy - adjustForLeap * cd) / ch
  ); // hour
  let minutes = Math.floor(
    (t - days * cd - hours * ch - years * cy - adjustForLeap * cd) / 60000
  ); // minutes

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  if (hours === 24) {
    days++;
    hours = 0;
  }
  if (days === 365) {
    years++;
    days = 0;
  }
  return { ms: diff, times: { years, days, hours, minutes } };
};

/**
 * @funciton getISODate
 * @description convert to ISO Date
 * @param {String} inputDate dateString
 * @param {String} [inputTime] dateString
 * @return {String}
 * @example
 *
 * const inputDate = '2020 01/02';
 * const inputTime = '20:10';
 * const time = getISODate(inputDate, inputTime);
 */
export const getIsoDate = (inputDate, inputTime = '') => {
  /* eslint-disable-next-line max-len */
  const pattern = /(\d{4})(\/|\\|\s|-)*(\d{2})(\/|\\|\s|-)*(\d{2})((\s|T){1,}((\d{2}):)?((\d{2}):?)?((\d{2}.\d{1,3}Z))?)?$/;
  const currentDate =
    inputDate instanceof Date ? inputDate.toISOString() : inputDate;
  const currentTime = inputTime ? `T${inputTime}` : '';
  const matches = pattern.exec(`${currentDate}${currentTime}`);

  if (!matches) return { date: '', time: '', dateTime: '' };
  const date = `${matches[1]}-${matches[3]}-${matches[5]}`;
  const hour = matches[9] || '00';
  const min = matches[11] || '00';
  const sec = matches[13] || '00.000Z';
  const time = `${hour}:${min}:${sec}`;
  return { date, time, dateTime: `${date}T${time}` };
};

/**
 * @function getTranslatedDate
 * @description ge translated date st ring
 * @param {Ojbect} param
 * @param {String|Object} param.date the date string
 * @param {String} [param.tz=us-EN] the tranlsation wanted
 * @param {Object} [param.options={}] the Intl options
 * @return {Date} the date string
 * @example
 *
 * const intlDate = getTranslatedDate({ date: new Date() , tz='zh});
 */
export const getTranslatedDate = ({ date, tz = 'us-EN', options = {} }) => {
  if (date instanceof Date) {
    return new Intl.DateTimeFormat(tz, options).format(date);
  }
  // validation
  return new Intl.DateTimeFormat(tz, options).format(new Date(date));
};

/**
 * @function guessTimezone
 * @description guess the time zone based on the users browser
 * @return {String}
 * @example
 * const guessedTz = guessTimezone(); // 'America/Los_Angels
 */
export const guessTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * @function isAfter
 * @description check if date is after
 * @param {Object} param
 * @param {String} param.start ISO start date
 * @param {String} param.date ISO date to see if after start
 * @param {Boolean} [param.inclusive] if check shoudl be inclusive of param.start date
 * @returns {Boolean}
 * @example
 * const params = {
 *  start: "2012-05-01",
 *  date: "2012-05-06",
 *  inclusive: true
 * }
 *
 * const dateIsAfter = isAfter(params);
 */
export const isAfter = ({ start, date, inclusive = false }) => {
  _helperIsValid(start, 'isAfter');
  _helperIsValid(date, 'isAfter');
  const startDate = start.split('-');
  const checkDate = date.split('-');

  const from = _helperGetDate(startDate);
  const d = _helperGetDate(checkDate);

  return inclusive ? d >= from : d > from;
};

/**
 * @function isBefore
 * @description check if date is before
 * @param {Object} param
 * @param {String} param.end ISO end date
 * @param {String} param.date ISO date to see if before end
 * @param {Boolean} [param.inclusive] if check shoudl be inclusive of param.end date
 * @returns {Boolean}
 * @example
 * const params = {
 *  start: "2012-05-01",
 *  date: "2012-05-06",
 *  inclusive: true
 * }
 *
 * const dateIsBefore = isBefore(params);
 */
export const isBefore = ({ end, date, inclusive = false }) => {
  _helperIsValid(end, 'isAfter');
  _helperIsValid(date, 'isAfter');
  const endDate = end.split('-');
  const checkDate = date.split('-');

  const to = _helperGetDate(endDate);
  const d = _helperGetDate(checkDate);

  return inclusive ? d <= to : d < to;
};

/**
 * @function isBetween
 * @desc check if ISO (YYYY-MM-DD) date is between values
 * @param {Object} param
 * @param {String} param.start ISO start date
 * @param {String} param.end ISO end date
 * @param {String} param.date ISO date to see if between start and end
 * @param {Boolean} [param.inclusiveStart=false] param.start is equal to or greater than start
 * @param {Boolean} [param.inclusiveEnd=false] param.end is equal to or greater than end
 * @returns {Boolean}
 * @example
 * const params = {
 *  start: "2012-05-01",
 *  end: "2012-05-04",
 *  date: "2012-05-06",
 *  inclusiveEnd: true
 * }
 *
 * const dateIsBetween = isBetween(params);
 */
export const isBetween = ({
  start,
  end,
  date,
  inclusiveStart,
  inclusiveEnd,
}) => {
  if (!date || !start || !end) return null;

  _helperIsValid(start, 'isBetween');
  _helperIsValid(end, 'isBetween');
  _helperIsValid(date, 'isBetween');
  const isAfterStart = isAfter({ start, date, inclusive: inclusiveStart });
  const isBeforeEnd = isAfter({ start, date, inclusive: inclusiveEnd });

  return isAfterStart && isBeforeEnd;
};

/**
 * @function isValidISO
 * @description check if string passed is a useable ISO date
 * @param {String} ISOdate the date to check
 * @returns {Boolean}
 */
export const isValidISO = ISOdate =>
  new RegExp(/^(\d{4})-(\d{2})(.)*$/).text(ISOdate) &&
  !Number.isNaN(Date.parse(ISOdate)) &&
  ISOdate.split('-').length === 3;

/**
 * @function subtractDateTime
 * @desc subtract time to specified dateTime
 * @param {Object} params
 * @param {String} params.dateTime ISO dateTime to add to
 * @param {Number} [params.years] amount of years to add
 * @param {Number} [params.months] amount of months to add
 * @param {Number} [params.days] amount of days to add
 * @param {Number} [params.hours] amount of hours to add
 * @param {Number} [params.minutes] amount of minutes to add
 * @param {Number} [params.seconds] amount of seconds to add
 * @return {String} the updated date
 * @example
 * const params = {
 *    dateTime: '2020-02-02',
 *    years: 5,
 *    minutes: 20
 * }
 *
 * const updatedDateTime = subtractDateTime(params);
 */
export const subtractDateTime = ({ dateTime, ...rest }) => {
  _helperIsValid(dateTime, 'subtractDateTime');
  let currentDT = new Date(dateTime);
  const options = {
    // order is important
    years: (date, amt) => date.setFullYear(date.getFullYear() - amt),
    months: (date, amt) => date.setMonth(date.getMonth() - amt),
    days: (date, amt) => date.setDate(date.getDate() - amt),
    hours: (date, amt) => date.setHours(date.getHours() - amt),
    minutes: (date, amt) => date.setMinutes(date.getMinutes() - amt),
    seconds: (date, amt) => date.setSeconds(date.getSeconds() - amt),
  };
  Object.entries(options).forEach(([key, func]) => {
    const value = rest[key];
    if (value) {
      currentDT = new Date(func(currentDT, value));
    }
  });
  return currentDT.toISOString();
};

export default {
  addDateTime,
  format,
  getDiff,
  getTranslatedDate,
  getIsoDate,
  guessTimezone,
  isAfter,
  isBefore,
  isBetween,
  isValidISO,
  subtractDateTime,
};
