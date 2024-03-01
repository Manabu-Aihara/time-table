import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventsContextProvider } from './EventsParent';
import { ViewComponent } from './templates/ViewComponents';
import { SampleTimeline } from "./organisms/TLComponent";
// import { InputComponent } from "./components/InputForm";

export const Index = () => {

	return (
		<EventsContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/"	element={<ViewComponent />} />
					<Route path="/timeline" element={<SampleTimeline />} />
				</Routes>
			</BrowserRouter>
		</EventsContextProvider>
	);
};
