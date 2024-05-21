import styles from './TodoSearch.module.css';

function TodoSearch(): JSX.Element {
	return (
		<label className={styles['m-todo-search__container']}>
			<input
				type="text"
				placeholder="Cortar cebolla"
				className={styles['m-todo-search__input']}
			/>
		</label>
	);
}

export { TodoSearch };
