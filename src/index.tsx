import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventsContextProvider } from './components/EventsParent';
import { ViewComponent } from './components/ViewComponents';
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
