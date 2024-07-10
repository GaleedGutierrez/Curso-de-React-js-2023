import { FC } from 'react';

import styles from './CheckboxIcon.module.css';

interface Props {
	isCompleted: boolean;
	updateIsCompleted: () => void;
}

export const CheckboxIcon: FC<Props> = ({ isCompleted, updateIsCompleted }) => (
	<div className={styles['a-checkbox']}>
		<input
			type="checkbox"
			defaultChecked={isCompleted}
			className="is-sr-only"
			onClick={updateIsCompleted}
			aria-label={
				isCompleted ? 'Mark task as active' : 'Mark task as completed'
			}
		/>
	</div>
);
