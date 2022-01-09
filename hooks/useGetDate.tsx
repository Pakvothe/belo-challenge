import { useEffect, useState } from 'react';

export const useGetDate = () => {
	const date = new Date();
	const Day = date.getDate();
	const Year = date.getFullYear();
	const [monthName, setMonthName] = useState('');
	const [dayName, setDayName] = useState('');

	const getMonth = (date: Date): string =>
		[
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			' November',
			'December',
		][date.getMonth()];
	const getDay = (date: Date): string =>
		['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
	const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

	useEffect(() => {
		setMonthName(capitalize(getMonth(date)));
		setDayName(capitalize(getDay(date)));
	}, []);

	return {
		Day,
		Year,
		monthName,
		dayName,
	};
};
