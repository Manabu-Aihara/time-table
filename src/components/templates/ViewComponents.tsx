import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './AuthParent';
import { EventsContextProvider } from './EventsParent';
import { MyCalendar } from '../pages/CalendarComponent';
import { SampleTimeline } from '../pages/TLComponent';
import { AuthLeavePage } from "../pages/AuthLeaveComponent";
import { AuthAxios } from "./AxiosClientProvider";
import { useEventsQuery } from '../../resources/queries';
// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";

export const RoutesComponent = () => {
	const [event, setEvent] = useState<TimelineEventProps>();
  // const todos = useEventsQuery();

  // console.log(`View: ${JSON.stringify(event)}`);
  // console.log((`From attendance: ${JSON.stringify(todos)}`));
  return (
    <>
      <AuthProvider>
        <AuthAxios>
          <EventsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/calendar"	element={<MyCalendar />} />
                <Route path="/timeline" element={
                  <SampleTimeline
                    onShowFormView={(event: TimelineEventProps) => setEvent(event)}
                    targetEvent={event!} />
                  } />
                <Route path="/auth" element={<AuthLeavePage />} />             
              </Routes>
            </BrowserRouter>
          </EventsContextProvider>
        </AuthAxios>
      </AuthProvider>
    </>
  );
}
