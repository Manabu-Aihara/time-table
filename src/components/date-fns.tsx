import { useState, useCallback, forwardRef, useRef } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import ja from 'date-fns/locale/ja'

import 'react-big-calendar/lib/css/react-big-calendar.css'

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

type Props = React.ComponentPropsWithRef<'input'>

const EventInput = forwardRef<HTMLInputElement, Props>(
  ({...props }, ref) => {
    return <input {...props} ref={ref} />
});

type Prop = {
  events: Event[];
}

export const MyCalendar = (/*{events}: Prop*/) => {
  const [schedules, setSchedules] = useState<Event[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef);

	const handleSelectEvent = useCallback(
		(callEvent: Event) => {
			window.alert(callEvent.title);
		},
		[]
	);

  const handleSelectSlot = useCallback(
		(data: Event) => {
			const { start, end } = data
			// const title = window.prompt('New Event name')
      let title: string;
      if(inputRef.current !== null){
        title = inputRef.current.value;
        setSchedules((prev) => [...prev, { start, end, title }]);
      }
    },
    [setSchedules]
	)

  return (
    <div>
      <EventInput ref={inputRef} />
      <Calendar
        localizer={localizer}
        // events={events}
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