const removeDuplicates = <T>(arr: T[]): T[] => [...new Set(arr)];

const isArrayEmpty = <T, _>(arr: T[]): boolean =>
	Array.isArray(arr) && !arr.length;

const stringifyMap = (valueMap) => {
	for (const [key] of valueMap.entries()) {
		if (key === undefined) {
			valueMap.delete(key);
		}
	}
	return JSON.stringify(Object.fromEntries(valueMap.entries()));
};

const isStringNullOrEmpty = (str: string): boolean =>
	str == null || str.trim() === "";

export { removeDuplicates, isArrayEmpty, stringifyMap, isStringNullOrEmpty };
