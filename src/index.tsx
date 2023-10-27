
import { EventsContextProvider } from './components/EventContext';
import { InputComponent } from './components/InputForm';
{/* <AddChildForm summary='' owner='' done={false} /> */}
export const Index = () => {
	// const [value, setValue] = useState('');
	return (
		<EventsContextProvider>
			<InputComponent />
		</EventsContextProvider>
	);
};