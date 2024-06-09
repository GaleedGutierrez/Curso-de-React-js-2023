export interface Task {
	text: string;
	completed: boolean;
	id: `${string}-${string}-${string}-${string}-${string}`;
}

export interface TodoContextType {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	searchedTodos: Task[];
	deleteTask: (id: string) => void;
	setLeftTodos: React.Dispatch<React.SetStateAction<number>>;
	updateStatusTask: (id: string, completed: boolean) => void;
	leftTodos: number;
}
