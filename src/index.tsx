import { BrowserRouter, Routes, Route } from "react-router-dom";

import { EventsContextProvider } from './components/EventsParent';
import { MyCalendar } from './components/ForDialog';
// import { InputComponent } from "./components/InputForm";

export const Index = () => {

	return (
		<EventsContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/"	element={<MyCalendar />} />
				</Routes>
			</BrowserRouter>
		</EventsContextProvider>
	);
};