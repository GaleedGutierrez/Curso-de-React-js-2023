function TodoItemsLeft({ itemLefts }: { itemLefts: number }): JSX.Element {
	return <p className="text-color-2">{itemLefts} items left</p>;
}

export { TodoItemsLeft };
