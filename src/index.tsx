import { useState } from 'react';

import { EventsContextProvider } from './components/EventContext';
import { InputComponent } from './components/InputForm';
{/* <AddChildForm summary='' owner='' done={false} /> */}
export const Index = () => {
    const [value, setValue] = useState('');
    return (
        <EventsContextProvider>
            <InputComponent
                title="タイトル"
                errorMessage="エラーメッセージ"
                inputElementProps={{
                    value,
                    onChange: (e) => setValue(e.target.value),
                }}
            />
        </EventsContextProvider>
    );
};