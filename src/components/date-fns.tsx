import { useState, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import ja from 'date-fns/locale/ja'

import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { useEventsState } from '../lib/UseContext'

const locales = {
  'ja-JP': ja,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// type Props = React.ComponentPropsWithRef<'input'>

// const EventInput = forwardRef<HTMLInputElement, Props>(
//   ({...props }, ref) => {
//     return <input {...props} ref={ref} />
// });

type Prop = {
  title: string;
}

export const MyCalendar = ({title}: Prop) => {
  const [schedules, setSchedules] = useState<Event[]>([]);
  // const events = useEventsState();
  // const dispatch = useEventsDispatch();

  // const ref = useRef(null);

	const handleSelectEvent = useCallback(
		() => {
			window.alert(schedules);
		},
		[]
	);

  // const showComponent = () => { return <EventInput ref={ref} /> }

  const handleSelectSlot = useCallback(
		(data: Event) => {
			const { start, end } = data
			// const title = window.prompt('New Event name')
      setSchedules((prev) => [...prev, { start, end, title }])
    },
    [setSchedules]
	)

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={schedules}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500 }}
      />
    </div>
  );
}