// import { useState, useCallback, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import ja from 'date-fns/locale/ja'

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useEventsState } from '../lib/UseContext'

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

export const MyCalendar = () => {
  // const [value, setValue] = useState<Event>();

  const events = useEventsState();
  // const dispatch = useEventsDispatch();
  console.log(events);
  // useEffect(() => {
  //   setValue(events)
  // })

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={handleSelectSlot}
        selectable
        style={{ height: 500 }}
      />
    </div>
  );
}