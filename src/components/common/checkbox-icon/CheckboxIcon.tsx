import { FC } from 'react';

interface Props {
	isCompleted: boolean;
	updateIsCompleted: () => void;
}

export const CheckboxIcon: FC<Props> = ({ isCompleted, updateIsCompleted }) => (
	<div className="a-checkbox">
		<input
			type="checkbox"
			defaultChecked={isCompleted}
			className="is-sr-only"
			onClick={updateIsCompleted}
		/>
	</div>
);
