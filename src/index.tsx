import { BrowserRouter, Routes, Route } from "react-router-dom";

import { EventsContextProvider } from './components/EventContext';
// import { MyCalendar } from './components/SlotInput';
import { InputComponent } from "./components/InputForm";

export const Index = () => {

	return (
		<EventsContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<InputComponent />} />
					<Route path="/form" element={<InputComponent />} />
				</Routes>
			</BrowserRouter>
		</EventsContextProvider>
	);
};