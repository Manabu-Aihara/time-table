import { useState } from "react";

// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";
import { MyCalendar } from '../pages/ContainComponent';
import { useEventsQuery } from "../../hooks/useFetch";

// import { customTheme } from '../../lib/Theme';

export const ViewComponent = () => {
	const [item, setItem] = useState<TimelineEventProps>();

  const todos = useEventsQuery();

  console.log(`View: ${JSON.stringify(item)}`);
  console.log((`From attendance: ${JSON.stringify(todos)}`))
  return (
    <>
      <MyCalendar onShowFormView={(event: TimelineEventProps) => setItem(event)}
        targetEvent={item!} />
    </>
  )
}
