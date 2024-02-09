import { useState } from "react";
// import { Event } from 'react-big-calendar';
import { EventItem } from '../lib/EventItem';
import { MyCalendar } from './ContainComponent';

export const ViewComponent = () => {
	const [item, setItem] = useState<EventItem>();

  return (
    <div>
      <MyCalendar onShowDialogView={(event: EventItem) => setItem(event)} targetEvent={item} />
    </div>
  )
}
