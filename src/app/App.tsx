import '../utils/googleAnalytics.js';

import { TodoContextProvider } from '@context/TodoContext';
import ReactGA from 'react-ga4';

import { AppUI } from './AppUI';

export function App(): JSX.Element {
	ReactGA.initialize('G-M8H4YB694S');
	ReactGA.send('pageview');

	return (
		<TodoContextProvider>
			<AppUI />
		</TodoContextProvider>
	);
}
