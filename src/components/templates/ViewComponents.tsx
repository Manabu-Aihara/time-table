import { useState } from "react";
import { EventItem } from '../../lib/EventItem';
import { MyCalendar } from '../pages/ContainComponent';

// import { customTheme } from '../../lib/Theme';

export const ViewComponent = () => {
	const [item, setItem] = useState<EventItem>({});

  console.log(`View: ${JSON.stringify(item)}`);
  return (
    <>
      <MyCalendar onShowFormView={(event: EventItem) => setItem(event)} targetEvent={item} />
    </>
  )
}
