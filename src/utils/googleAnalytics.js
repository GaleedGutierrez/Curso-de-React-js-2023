import { onCLS, onINP, onLCP } from 'web-vitals';

// Web Vitals
function sendToGoogleAnalytics({
	name,
	delta,
	id,
}){
	gtag('event', name, {
		event_category: 'Web Vitals',
		event_label: id,
		value: Math.round(name === 'CLS' ? delta * 1000 : delta),
		non_interaction: true,
	});
}
onCLS(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
