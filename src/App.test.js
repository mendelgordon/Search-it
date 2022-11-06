import App from "./App";
import { render } from "@testing-library/react";

test("it renders without crashing", () => {
	const div = document.createElement("div");
	render(<App />, div);
});
