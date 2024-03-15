import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";
import { MyCalendar } from '../pages/ContainComponent';
import { SampleTimeline } from '../pages/TLComponent';
import { useEventsQuery } from '../../hooks/useFetch';

// import { customTheme } from '../../lib/Theme';

export const RoutesComponent = () => {
	const [event, setEvent] = useState<TimelineEventProps>();

  const todos = useEventsQuery();

  // console.log(`View: ${JSON.stringify(event)}`);
  console.log((`From attendance: ${JSON.stringify(todos)}`))
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"	element={<MyCalendar />} />
          <Route path="/timeline" element={
            <SampleTimeline
              onShowFormView={(event: TimelineEventProps) => setEvent(event)}
              targetEvent={event!} />
            } />
        </Routes>
      </BrowserRouter>
    </>
  );
}
