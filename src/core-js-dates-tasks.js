/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  return date.toString().split(' ')[4];
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const thatDay = new Date(Date.parse(date));
  const options = { weekday: 'long' };
  const resDay = new Intl.DateTimeFormat('en-US', options).format(thatDay);
  return resDay;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const thatDay = new Date(Date.parse(date));
  const weekDay = thatDay.getDay();
  const theDay = thatDay.getDate();
  let addDays = weekDay > 5 ? weekDay : 5 - weekDay;
  if (weekDay === 5) addDays = 7;
  const newDay = thatDay.setDate(theDay + addDays);
  const result = new Date(newDay);
  return result;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const result = date.getDate();
  return result;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const result = (endDate - startDate) / 86400000;
  return result + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const theDay = new Date(Date.parse(date));
  const startDay = new Date(Date.parse(period.start));
  const endDay = new Date(Date.parse(period.end));
  return !(theDay < startDay || theDay > endDay);
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const theDay = new Date(date);
  const theDate = theDay.toLocaleDateString('en-US', { timeZone: 'UTC' });
  const theTime = theDay.toLocaleTimeString('en-US', { timeZone: 'UTC' });
  return `${theDate}, ${theTime}`;
}
/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const lastDay = new Date(year, month, 0);
  const firstDay = new Date(year, month - 1, 1);
  const days = new Date(year, month, 0);
  const daysNum = days.getDate();
  const firstWeekDay = firstDay.getDay();
  const lastWeekDay = lastDay.getDay();
  let weekEndDaysOrig = Math.floor(daysNum / 7) * 2;
  if (lastWeekDay === 0 && firstWeekDay < 6 && firstWeekDay > 0)
    weekEndDaysOrig += 2;
  if (lastWeekDay === 6 && firstWeekDay < 6 && firstWeekDay > 0)
    weekEndDaysOrig += 1;
  if (firstWeekDay === 6 && lastWeekDay < 6 && lastWeekDay > 0)
    weekEndDaysOrig += 2;
  if (firstWeekDay === 0 && lastWeekDay < 6 && lastWeekDay > 0)
    weekEndDaysOrig += 1;
  return weekEndDaysOrig;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(/* date */) {
  // const currentDate = new Date(date);
  // const januaryFirst = new Date(currentDate.getFullYear(), 0, 1);
  // const daysToNextMonday =
  //   januaryFirst.getDay() === 1 ? 0 : (7 - januaryFirst.getDay()) % 7;
  // const nextMonday = new Date(
  //   currentDate.getFullYear(),
  //   0,
  //   januaryFirst.getDate() + daysToNextMonday
  // );

  // const thatWeek =
  //   currentDate > nextMonday
  //     ? Math.ceil((currentDate - nextMonday) / (24 * 3600 * 1000) / 7)
  //     : 1;

  // return currentDate < nextMonday ? 52 : thatWeek;

  // const theDate = new Date(date);
  // const thisYear = theDate.getYear();
  // const thisMonth = theDate.getMonth();
  // const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // const febDays = new Date(thisYear, 2, 0);
  // monthsDays[1] = febDays;
  // const daysToMonth = monthsDays.slice(0, thisMonth);
  // const totalDays =
  //   daysToMonth.reduce((sum, item) => sum + item, 0) + theDate.getDate();

  // const startWeekAdjust = 0;
  // const weeksNum = Math.ceil(totalDays / 7) + 1;
  // return weeksNum;
  throw new Error('Not implemented');
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const thisDate = new Date(date);
  const thisYear = thisDate.getFullYear();
  let thisMon = thisDate.getMonth();

  thisMon = thisDate.getDate() < 13 ? thisMon : thisMon + 1;
  for (let i = thisMon; i < 12; i += 1) {
    const result = new Date(Date.parse(`${thisYear}, ${i}, 13`));
    if (result.getDay() === 5) return result;
  }
  return false;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const thisDate = new Date(date);
  const thisMonth = thisDate.getMonth();
  if (thisMonth < 4) return 1;
  if (thisMonth < 7) return 2;
  if (thisMonth < 10) return 3;
  if (thisMonth < 13) return 4;
  return false;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(/* period, countWorkDays, countOffDays */) {
  // const startDate = new Date(Date.parse(period.start));
  // const startMonth = startDate.getMonth();
  // const endDate = new Date(Date.parse(period.end));
  // const endMonth = endDate.getMonth();
  // let workDaysLeftOver = 0;
  // let offDaysLeftOver = 0;
  // const result = [];
  // for (let i = startMonth; i <= endMonth; i += 1) {
  //   const dateStart = i === startMonth ? startDate.getDate() : 1;
  //   const lastMonthDay = new Date(startDate.getFullYear(), i, 0);
  //   const dateEnd = i === endMonth ? endDate.getDate() : lastMonthDay.getDate();
  //   for (let j = dateStart; j <= dateEnd; i += 1) {
  //   }
  throw new Error('Not implemented');
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const theDate = new Date(date);
  const thisYear = theDate.getYear();
  if (thisYear % 100 === 0 && thisYear % 400 === 0) return true;
  if (thisYear % 4 === 0) return true;
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
