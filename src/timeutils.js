/* eslint no-octal: 0 */

const Enum = require('enum');

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

		console.log(res);

		return zones[res] ? zones[res] : null;
	} else {
		return null;
	}
};
module.exports.getTimeZoneFromName = getTimeZoneFromName;
