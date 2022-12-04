export const convertTime = (time) => {
	// if time isn't a number, return it
	if (isNaN(time)) {
		return time;
	}
	const date = new Date(time * 1000);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	return `${month}/${day}/${year} ${hour}:${minute}`;
};
