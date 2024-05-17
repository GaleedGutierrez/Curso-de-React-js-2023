import './App.css';

import React from 'react';

import { CreateTodoButton } from './CreateTodoButton';
import { TodoCounter } from './TodoCounter';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';
import { TodoSearch } from './TodoSearch';
import { Item } from './types/interfaces';

const DEFAULT_TODOS: Item[] = [
	{ text: 'Cortar cebolla', completed: true },
	{ text: 'Tomar el curso de intro a React', completed: false },
	{ text: 'Llorar con la llorona', completed: false },
	{ text: 'Ver Platzi Live', completed: true },
	{ text: 'Ir al gym', completed: false },
];

function App(): React.JSX.Element {
	return (
		<React.Fragment>
			<TodoCounter
				completed={16}
				total={25}
			/>
			<TodoSearch />

			<TodoList>
				{DEFAULT_TODOS.map(({ text, completed }) => (
					<TodoItem
						key={text}
						text={text}
						completed={completed}
					/>
				))}
			</TodoList>

			<CreateTodoButton />
		</React.Fragment>
	);
}

export default App;
