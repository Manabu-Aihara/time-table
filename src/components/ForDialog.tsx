import { useState, useCallback, forwardRef, useRef } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import ja from 'date-fns/locale/ja'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDialog } from '../hooks/useDialog'

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
  const [Dialog, open, close, data] = useDialog();
  const [schedules, setSchedules] = useState<Event[]>([]);

  const handleSelectSlot = useCallback(() => {
    open();
  }, []);

  const handleReflect = (event: Event) => {
    const { start, end } = event;
    if(data !== null){
      setSchedules((prev) => [...prev, { start, end, data }]);
    }
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={schedules}
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500 }}
      />
      <p>openボタンを押してダイアログを開きます</p>
      <div style={{ height: "200px" }} />
      <Dialog>
        <div>
          <p>ここにダイアログのコンテンツを入れたいんじゃ!!</p>
          <button onClick={close}>close</button>
        </div>
      </Dialog>
    </div>
  )
}