import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './AuthParent';
import { EventsContextProvider } from './EventsParent';
import { MyCalendar } from '../pages/ContainComponent';
import { SampleTimeline } from '../pages/TLComponent';
import { AuthTestPage } from "../pages/TestAuthComponent";
import { useEventsQuery } from '../../hooks/useFetch';
// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";
// import { customTheme } from '../../lib/Theme';

export const RoutesComponent = () => {
	const [event, setEvent] = useState<TimelineEventProps>();
  // const todos = useEventsQuery();

  // console.log(`View: ${JSON.stringify(event)}`);
  // console.log((`From attendance: ${JSON.stringify(todos)}`));
  return (
    <>
      <AuthProvider>
        <EventsContextProvider>
          {/* <BrowserRouter> */}
            <Routes>
              <Route path="/calendar"	element={<MyCalendar />} />
              <Route path="/timeline" element={
                <SampleTimeline
                  onShowFormView={(event: TimelineEventProps) => setEvent(event)}
                  targetEvent={event!} />
                } />
              <Route path="/auth" element={<AuthTestPage />} />             
            </Routes>
          {/* </BrowserRouter> */}
        </EventsContextProvider>
      </AuthProvider>
    </>
  );
}
