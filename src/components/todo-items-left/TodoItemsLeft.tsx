import { FC } from 'react';

interface Props {
	itemLefts: number;
}

export const TodoItemsLeft: FC<Props> = ({ itemLefts }) => (
	<p className="text-color-2">{itemLefts} items left</p>
);
