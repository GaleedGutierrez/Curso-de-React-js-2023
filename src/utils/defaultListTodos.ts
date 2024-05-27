import { Task } from '@src/types/interfaces';

export const DEFAULT_TODOS: Task[] = [
	{
		text: 'Cortar cebolla',
		completed: true,
		id: globalThis.crypto.randomUUID(),
	},
	{
		text: 'Tomar el curso de intro a React',
		completed: false,
		id: globalThis.crypto.randomUUID(),
	},
	{
		text: 'Llorar con la llorona',
		completed: false,
		id: globalThis.crypto.randomUUID(),
	},
	{
		text: 'Ver Platzi Live',
		completed: true,
		id: globalThis.crypto.randomUUID(),
	},
	{ text: 'Ir al gym', completed: false, id: globalThis.crypto.randomUUID() },
	{
		text: 'Usar estados derivados en React',
		completed: false,
		id: globalThis.crypto.randomUUID(),
	},
];
