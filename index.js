const compose = (...args) => (timeObj) =>  args.reduce((acc, fn) => fn(acc), timeObj);

//=========================

const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clearConsole = () => console.clear();
const logClock = (time) => console.log(time);

const serializeClockTime = (date) => ({
	hours: date.getHours(),
	minutes: date.getMinutes(),
	seconds: date.getSeconds(),
});

const civilianHours = (clockTime) => ({
	...clockTime,
	hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours,
});
const appendAMPM = (clockTime) => ({
	...clockTime,
	ampm: clockTime.hours > 12 ? 'PM' : 'AM',
});

const display = (target) => (time) => target(time);

const formatClock = (timeFormat) => (clockTime) => {
	return timeFormat
		.replace('hh', clockTime.hours)
		.replace('mm', clockTime.minutes)
		.replace('ss', clockTime.seconds)
		.replace('tt', clockTime.ampm);
};
const prependZero = (key) => (civilianTime) => ({
	...civilianTime,
	[key]: civilianTime[key] < 10 ? '0' + civilianTime[key] : civilianTime[key],
});

//----------
const convertToCivilianTime = (clockTime) => {
	return compose(civilianHours, appendAMPM)(clockTime);
};

const doubleDigits = (civilianTime) => {
	return compose(
		prependZero('hours'),
		prependZero('minutes'),
		prependZero('seconds')
	)(civilianTime);
};
// --------------
const startTicking = () => {
	setInterval(
		compose(
			clearConsole,
			getCurrentTime,
			serializeClockTime,
			convertToCivilianTime,
			doubleDigits,
			formatClock('hh:mm:ss tt'),
			display(logClock)
		),
		oneSecond()
	);
};

startTicking();
