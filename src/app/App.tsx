import { TodoContextProvider } from '@context/TodoContext';

import { AppUI } from './AppUI';

export function App(): JSX.Element {
	return (
		<TodoContextProvider>
			<AppUI />
		</TodoContextProvider>
	);
}
