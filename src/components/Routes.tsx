import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { EventsContextProvider } from './EventsParent';
import { ViewComponent } from './templates/ViewComponents';
import { SampleTimeline } from "./organisms/TLComponent";
// import { InputComponent } from "./components/InputForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Index = () => {

	return (
		<QueryClientProvider client={queryClient}>
			<EventsContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/"	element={<ViewComponent />} />
						<Route path="/timeline" element={<SampleTimeline />} />
					</Routes>
				</BrowserRouter>
			</EventsContextProvider>
		</QueryClientProvider>
	);
};
