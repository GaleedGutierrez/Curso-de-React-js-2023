import { useEffect, useState } from 'react';

interface customState<T> {
	item: T[];
	setItem: (newItem: T[]) => void;
	loading: boolean;
	error: boolean;
}

export function useLocalStorageList<T>(
	key: string,
	initialValue: T[] = [],
): customState<T> {
	const [ITEM, setItem] = useState(initialValue);
	const [LOADING, setLoading] = useState(true);
	const [ERROR, setError] = useState(false);

	useEffect(() => {
		try {
			const LOCAL_STORAGE_DATA =
				localStorage.getItem(key) ?? JSON.stringify(initialValue);

			const PARSED_ITEM = JSON.parse(LOCAL_STORAGE_DATA) as T[];

			setItem(PARSED_ITEM);
			setLoading(false);
			// console.log({ PARSED_ITEM });
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	}, []);

	function updateItem(newItem: T[]): void {
		localStorage.setItem(key, JSON.stringify(newItem));
		setItem(newItem);
	}

	return { item: ITEM, setItem: updateItem, loading: LOADING, error: ERROR };
}
