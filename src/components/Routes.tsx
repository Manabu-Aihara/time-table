import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventsContextProvider } from './EventsParent';
import { ViewComponent } from './templates/ViewComponents';
// import { InputComponent } from "./components/InputForm";

export const Index = () => {

	return (
		<EventsContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/"	element={<ViewComponent />} />
				</Routes>
			</BrowserRouter>
		</EventsContextProvider>
	);
};
