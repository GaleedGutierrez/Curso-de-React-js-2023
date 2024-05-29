import { Header } from '@src/components/common/header/Header';
import { TodoBoxStatus } from '@src/components/todo-box-status/TodoBoxStatus';
import { TodoItem } from '@src/components/todo-item/TodoItem';
import { TodoList } from '@src/components/todo-list/TodoList';
import { TodoAddNewTask } from '@src/components/todo-search/TodoSearch';
import { Task } from '@src/types/interfaces';
import { FC } from 'react';

import styles from './App.module.css';

interface Props {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	searchedTodos: Task[];
	deleteTask: (id: string) => void;
	setLeftTodos: React.Dispatch<React.SetStateAction<number>>;
	updateStatusTask: (id: string, completed: boolean) => void;
	leftTodos: number;
}

export const AppUI: FC<Props> = ({
	searchValue,
	setSearchValue,
	searchedTodos,
	deleteTask,
	setLeftTodos,
	updateStatusTask,
	leftTodos,
}) => (
	<div className={styles['app-container']}>
		<Header />

		<main>
			<TodoAddNewTask
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<div
				style={{
					display: searchedTodos.length === 0 ? 'none' : 'block',
				}}
			>
				<section className={styles['g-todo-container']}>
					<TodoList>
						{searchedTodos.map(({ text, completed, id }) => (
							<TodoItem
								key={id}
								id={id}
								text={text}
								initialCompleted={completed}
								deleteTask={deleteTask}
								setLeftTodos={setLeftTodos}
								updateStatusTask={updateStatusTask}
							/>
						))}
					</TodoList>
					<TodoBoxStatus initialLeftsTodos={leftTodos} />
				</section>

				<p className={styles['app-container__drag-and-drop']}>
					Drag and drop to reorder list
				</p>
			</div>
		</main>
	</div>
);
