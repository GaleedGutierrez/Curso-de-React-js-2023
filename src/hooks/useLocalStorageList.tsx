import { useState } from 'react';

type UseLocalStorageList<T> = [T[], (newItem: T[]) => void];

export function useLocalStorageList<T>(
	key: string,
	initialValue: T[],
): UseLocalStorageList<T> {
	const LOCAL_STORAGE_DATA =
		localStorage.getItem(key) ?? JSON.stringify(initialValue);
	const PARSED_ITEM = JSON.parse(LOCAL_STORAGE_DATA) as T[];
	const [ITEM, setItem] = useState(PARSED_ITEM);

	function updateItem(newItem: T[]): void {
		localStorage.setItem(key, JSON.stringify(newItem));
		setItem(newItem);
	}

	return [ITEM, updateItem];
}
