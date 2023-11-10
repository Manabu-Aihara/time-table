import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { EventsContextProvider } from './components/EventsParent';
import { MyCalendar } from './components/ForDialog';
// import { InputComponent } from "./components/InputForm";

export const Index = () => {
	// const state = useEventsState();

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