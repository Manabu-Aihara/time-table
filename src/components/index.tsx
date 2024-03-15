import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { EventsContextProvider } from './EventsParent';
import { RoutesComponent } from './templates/ViewComponents';
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
				<RoutesComponent />
			</EventsContextProvider>
		</QueryClientProvider>
	);
};
