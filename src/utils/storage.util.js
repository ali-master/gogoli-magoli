export function read(key, defaultValue) {
	const val = localStorage.getItem(key);

	if(!val) {
		return defaultValue;
	}

	return val;
}

export function store(key, value) {
	localStorage.setItem(key, value);
}

export function remove(key) {
	localStorage.removeItem(key);
}