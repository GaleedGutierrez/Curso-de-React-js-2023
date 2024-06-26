export interface Task {
	text: string;
	completed: boolean;
	id: Uuid;
}

export interface ITodoContext {
	todos: Task[];
	setTodos: (newItem: Task[]) => void;
	deleteTask: ({ todos, setTodos, id }: DeleteTaskParams) => void;
	setLeftTodos: React.Dispatch<React.SetStateAction<number>>;
	updateStatusTask: ({
		todos,
		id,
		completed,
		setTodos,
	}: updateStatusTaskParameters) => void;
	leftTodos: number;
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	changeTheme: ({
		body,
		darkThemePreference,
		useSystemTheme,
		setTheme,
	}: ChangeThemeParameters) => void;
	editingTask: Task[id];
	setEditingTask: React.Dispatch<React.SetStateAction<Uuid>>;
	updateTask: ({ todos, setTodos, id, newText }: Parameters) => void;
	body: HTMLBodyElement;
	darkThemePreference: MediaQueryList;
	filteredTodos: Task[];
	currentHash: FilterHash;
}

export interface ThemeContext {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
