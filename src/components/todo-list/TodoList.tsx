import { FC } from 'react';

import styles from './TodoList.module.css';

interface Props {
	children: React.ReactNode;
}

export const TodoList: FC<Props> = ({ children }) => (
	<ul className={styles['m-todo-list']}>{children}</ul>
);
