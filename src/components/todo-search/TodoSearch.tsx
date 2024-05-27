import { FC } from 'react';

import styles from './TodoSearch.module.css';

interface Props {
	searchValue: string;
	setSearchValue: (value: React.SetStateAction<string>) => void;
}

export const TodoAddNewTask: FC<Props> = ({ searchValue, setSearchValue }) => (
	<label
		className={styles['m-todo-search__container']}
		htmlFor="new-todo"
	>
		<input
			type="text"
			placeholder="Create a new task…"
			className={styles['m-todo-search__input']}
			id="new-todo"
			value={searchValue}
			onChange={(event) => {
				const VALUE = event.target.value;

				setSearchValue(VALUE);
			}}
		/>
	</label>
);
