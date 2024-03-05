import { useState } from "react";

// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from "../../lib/TimelineType";
import { MyCalendar } from '../pages/ContainComponent';

// import { customTheme } from '../../lib/Theme';

export const ViewComponent = () => {
	const [item, setItem] = useState<TimelineEventProps>();

  console.log(`View: ${JSON.stringify(item)}`);
  return (
    <>
      <MyCalendar onShowFormView={(event: TimelineEventProps) => setItem(event)}
        targetEvent={item!} />
    </>
  )
}
