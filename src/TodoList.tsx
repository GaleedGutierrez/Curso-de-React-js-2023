import { PropsWithChildren } from 'react';

function TodoList(props: PropsWithChildren): JSX.Element {
	return <ul>{props.children}</ul>;
}

export { TodoList };
