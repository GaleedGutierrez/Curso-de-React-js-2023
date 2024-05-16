import './App.css';

import { CreateTodoButton } from './CreateTodoButton';
import { TodoCounter } from './TodoCounter';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';
import { TodoSearch } from './TodoSearch';

function App(): React.JSX.Element {
	return (
		<div className="App">
			<TodoCounter />
			<TodoSearch />

			<TodoList>
				<TodoItem />
				<TodoItem />
				<TodoItem />
			</TodoList>

			<CreateTodoButton />
		</div>
	);
}

export default App;
