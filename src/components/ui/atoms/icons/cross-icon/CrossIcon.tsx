import styles from '../icons.module.css';

export function CrossIcon(): JSX.Element {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.8rem"
			height="1.8rem"
			className={styles['a-icon']}
		>
			<path
				fill="#494C6B"
				fillRule="evenodd"
				d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
			/>
		</svg>
	);
}
