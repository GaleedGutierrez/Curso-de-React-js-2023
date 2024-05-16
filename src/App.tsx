import './App.css';

import React from 'react';

function App(): React.JSX.Element {
	return (
		<div className="App">
			<TodoCounter />
			{/* <TodoSearch /> */}

			{/* <TodoList> */}
			<TodoItem />
			<TodoItem />
			<TodoItem />
			{/* </TodoList> */}

			{/* <CreateTodoButton /> */}
		</div>
	);
}

function TodoItem(): React.JSX.Element {
	return (
		<li>
			<label>
				<input type="checkbox" />
				<span>Texto de ejemplo</span>
			</label>
			<button type="button">Eliminar</button>
		</li>
	);
}

function TodoCounter(): React.JSX.Element {
	return (
		<li>
			<label>
				<input type="checkbox" />
				<span>Texto de ejemplo</span>
			</label>
			<button type="button">Eliminar</button>
		</li>
	);
}

export default App;
