import { Item } from './types/interfaces';

function TodoItem({ text, completed }: Item): JSX.Element {
	return (
		<li>
			<label>
				<input
					type="checkbox"
					checked={completed}
				/>
				<span>{text}</span>
			</label>
			<button type="button">Eliminar</button>
		</li>
	);
}

export { TodoItem };
