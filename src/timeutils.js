/* eslint no-octal: 0 */

const Enum = require('enum');
const moment = require('moment');
const db = require('./database.js').PREFERENCES;

/*
 * An enum of time zones, by UTC offset, ignoring Daylight Savings Time.
 */
const zones = new Enum({
	'UTC-1200': [-12,  00],
	'UTC-1100': [-11,  00],
	'UTC-1000': [-10,  00],
	'HST':      [-10,  00],
	'UTC-0930': [-09, -30],
	'UTC-0900': [-09,  00],
	'AKST':     [-09,  00],
	'UTC-0800': [-08,  00],
	'PT':       [-08,  00],
	'PST':      [-08,  00],
	'UTC-0700': [-07,  00],
	'MT':       [-07,  00],
	'MST':      [-07,  00],
	'UTC-0600': [-06,  00],
	'CT':       [-06,  00],
	'CST':      [-06,  00],
	'UTC-0500': [-05,  00],
	'ET':       [-05,  00],
	'EST':      [-05,  00],
	'UTC-0400': [-04,  00],
	'AST':      [-04,  00],
	'UTC-0330': [-03, -30],
	'UTC-0300': [-03,  00],
	'UTC-0200': [-02,  00],
	'UTC-0100': [-01,  00],
	'UTC-0000': [ 00,  00],
	'GMT':      [ 00,  00],
	'UTC+0000': [ 00,  00],
	'WET':      [ 00,  00],
	'UTC+0100': [ 01,  00],
	'CET':      [ 01,  00],
	'MET':      [ 01,  00],
	'MEZ':      [ 01,  00],
	'RST':      [ 01,  00],
	'WAT':      [ 01,  00],
	'UTC+0200': [ 02,  00],
	'KALT':     [ 02,  00],
	'EET':      [ 02,  00],
	'CAT':      [ 02,  00],
	'SAST':     [ 02,  00],
	'UTC+0300': [ 03,  00],
	'KSA':      [ 03,  00],
	'FET':      [ 03,  00],
	'MSK':      [ 03,  00],
	'TRT':      [ 03,  00],
	'EAT':      [ 03,  00],
	'UTC+0330': [ 03,  30],
	'IRST':     [ 03,  30],
	'UTC+0400': [ 04,  00],
	'SAMT':     [ 04,  00],
	'AMT':      [ 04,  00],
	'AZT':      [ 04,  00],
	'UTC+0430': [ 04,  30],
	'AFT':      [ 04,  30],
	'UTC+0500': [ 05,  00],
	'YEKT':     [ 05,  00],
	'UTC+0530': [ 05,  30],
	'IST':      [ 05,  30],
	'SLST':     [ 05,  30],
	'UTC-0545': [ 05,  45],
	'NPT':      [ 05,  45],
	'UTC+0600': [ 06,  00],
	'OMST':     [ 06,  00],
	'KGT':      [ 06,  00],
	'BST':      [ 06,  00],
	'BTT':      [ 06,  00],
	'UTC+0630': [ 06,  30],
	'MMT':      [ 06,  30],
	'UTC+0700': [ 07,  00],
	'KRAT':     [ 07,  00],
	'UTC+0800': [ 08,  00],
	'IRKT':     [ 08,  00],
	'UTC+0900': [ 09,  00],
	'YAKT':     [ 09,  00],
	'JST':      [ 09,  00],
	'KST':      [ 09,  00],
	'UTC+1000': [ 10,  00],
	'VLAT':     [ 10,  00],
	'AEST':     [ 10,  00],
	'UTC+1100': [ 11,  00],
	'MAGT':     [ 11,  00],
	'UTC+1200': [ 12,  00],
	'PETT':     [ 12,  00],
	'ANAT':     [ 12,  00],
	'UTC+1245': [ 12,  45],
	'UTC+1300': [ 13,  00],
	'UTC+1400': [ 14,  00]
});

const getTimeZoneFromName = (str) => {
	str = str.toUpperCase().replace(':', '');

	if(zones[str]) {
		return zones[str];
	} else if(str.includes('UTC')) {
		let res = 'UTC';

		if(/-/g.test(str)) {
			res += '-';
		} else {
			res += '+';
		}

		let offset = /(\d+)/g.exec(str)[0];
		if(offset.length === 1) {
			res += offset.padStart(2, '0').padEnd(4, '0');
		} else if(offset.length === 2) {
			res += offset.padEnd(4, '0');
		} else if(offset.length === 3) {
			res += offset.padStart(4, '0');
		} else {
			res += offset;
		}

		return zones[res] ? zones[res] : null;
	} else {
		return null;
	}
};
module.exports.getTimeZoneFromName = getTimeZoneFromName;

const getFebLength = (_) => {
	const year = _.getFullYear();
	if(year % 4 === 0 && !(year % 400 === 0)) return 29;
	return 28;
};
const padH = (h) => {
	if(h >= 0) {
		return '+' + h.toString().padStart(2, '0');
	} else {
		if(h.toString().length > 2) return h.toString();
		return `-0${h.toString().substring(1)}`;
	}
};
const padH_ = (h) => {
	if(h >= 0) {
		return h.toString().padStart(2, '0');
	} else {
		if(h.toString().length > 2) return h.toString();
		return `-0${h.toString().substring(1)}`;
	}
};
const isDST = (_) => {
	return moment().utcOffset(`${padH_(_[0])}:${_[1].toString().padStart(2, '0')}`).isDST();
};
const getISOTimeIn = (timezone) => {
	const zone = getTimeZoneFromName(timezone);
	if(zone === null) return null;
	const [hOffset, mOffset] = zone.value;
	const dstOffset = isDST(zone.value) ? 1 : 0;

	const _ = new Date();
	const _hours = _.getUTCHours();
	const _minutes = _.getUTCMinutes();

	let year = _.getFullYear();
	let month = _.getMonth();
	let date = _.getUTCDate();
	let hours = _hours + hOffset + dstOffset;
	let minutes = _minutes + mOffset;

	const monthLengths = [31, getFebLength(_), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if(minutes >= 60) {
		minutes = minutes - 60;
		hours += 1;
	}
	if(hours >= 24) {
		hours = hours - 24;
		date += 1;
	}
	if(date > monthLengths[month]) {
		date = 1;
		month += 1;
	}
	if(month + 1 > 12) {
		month = 1;
		year += 1;
	}

	month += 1;

	return [
		`${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00Z`,
		hOffset < 0
	];
};

const timeStyles = {
	'12-hour': 'h:mm A',
	'am-pm':   'h:mm A',
	'24-hour': 'HH:mm'
};
const dateStyles = {
	'month-first':       'MM/DD/YYYY',
	'short-month-first': 'M/D/YY',
	'date-first':        'DD/MM/YYYY',
	'short-date-first':  'D/M/YY'
};

const getFormat = (prefs) => {
	return {
		timeStyle: timeStyles[prefs.timeStyle],
		dateStyle : dateStyles[prefs.dateStyle]
	};
};
const getFormatFor = (userID) => {
	if(db.has(userID)) {
		return `${db.get(userID).timeStyle}, ${db.get(userID).dateStyle}`;
	} else {
		db.set(userID, getFormat(require('./config.json').defaultPreferences));

		return `${db.get(userID).timeStyle}, ${db.get(userID).dateStyle}`;
	}
};
module.exports.getFormatFor = getFormatFor;

const getTimeIn = (timezone, format) => {
	const [ISO, behind] = getISOTimeIn(timezone);
	if(ISO === null) return null;

	return moment(ISO).utcOffset(behind ? 1 : 0).format(format);
};
module.exports.getTimeIn = getTimeIn;
