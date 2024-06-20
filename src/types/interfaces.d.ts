export interface Task {
	text: string;
	completed: boolean;
	id: `${string}-${string}-${string}-${string}-${string}`;
}

export interface ITodoContext {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	searchedTodos: Task[];
	deleteTask: (id: string) => void;
	setLeftTodos: React.Dispatch<React.SetStateAction<number>>;
	updateStatusTask: (id: string, completed: boolean) => void;
	leftTodos: number;
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	changeTheme: (useSystemTheme?: boolean) => void;
	editingTask: Task[id];
	setEditingTask: React.Dispatch<
		React.SetStateAction<`${string}-${string}-${string}-${string}-${string}`>
	>;
	updateTask: (id: Task['id'], newText: string) => void;
}

export interface ThemeContext {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}
