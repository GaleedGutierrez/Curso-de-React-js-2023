import { FC } from 'react';

import styles from '../icons.module.css';

interface Props {
	className?: string;
}

export const NoteAddIcon: FC<Props> = ({ className = '' }) => (
	<svg
		className={`${styles['a-icon']} ${styles['a-icon--big']} ${className}`}
		xmlns="http://www.w3.org/2000/svg"
		height="4.8rem"
		viewBox="0 -960 960 960"
		width="4.8rem"
		fill="#5f6368"
	>
		<path d="M450-234h60v-129h130v-60H510v-130h-60v130H320v60h130v129ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
	</svg>
);
