import App from "./App";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";

// it renders without crashing
it("renders without crashing", () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);
});
