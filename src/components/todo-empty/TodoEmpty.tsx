import { NoteAddIcon } from '../ui/atoms/icons/note-add-icon/NoteAddIcon';
import styles from './TodoEmpty.module.css';

export function TodoEmpty(): JSX.Element {
	return (
		<section className={styles['m-add-first-task-card']}>
			<NoteAddIcon />
			<p>Add your first task</p>
		</section>
	);
}
