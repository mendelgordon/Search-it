import { useRouteError, Link } from "react-router-dom";
import { gtag, install } from 'ga-gtag';
import { useEffect	} from 'react';

install('G-XYL8BTY99J');

export function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	useEffect(() => {
		gtag('event', 'error', {
			'event_category': 'error',
			'event_label': 'error',
			'value': error
		});
	}, [error]);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>Please send me the link to this page so I can fix it!</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<p>
				<Link to="/">Go back to the home page</Link>
			</p>
			<p>
				<Link to="#">Reload this page</Link>
			</p>
		</div>
	);
}
