function getRandomString(length) {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function getRandomFloat(min, max, decimals) {
	return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImagePath() {
	return `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
}

function getRandomValueFromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export function generateData(count) {
	const data = [];
	const values = ["str1", "str2", "str3", "str4", "str5"];
	for (let i = 0; i < count; i++) {
		data.push({
			val1: getRandomString(10),
			val2: getRandomFloat(1, 100, 2),
			val3: getRandomFloat(1, 100, 4),
			val4: getRandomInt(1, 100),
			val5: getRandomInt(1, 100),
			val6: getRandomImagePath(),
			val7: getRandomString(10),
			val8: getRandomValueFromArray(values),
		});
	}
	return data;
}
