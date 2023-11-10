import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { useEventsState } from "../lib/UseContext";
import { useDialog } from '../hooks/useDialog';

import 'react-big-calendar/lib/css/react-big-calendar.css';

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
  const [Dialog, open, close, events] = useDialog();
  const state = useEventsState()

  const handleSelectSlot = useCallback(() => {
    open();
  }, []);

  console.log(`ダイアログ外:${events}->${JSON.stringify(state)}`);
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        // onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        style={{ height: 500 }}
      />
      <div style={{ height: "100px" }} />
        <Dialog>
          <div>
            <p>ここにダイアログのコンテンツを入れたいんじゃ!!</p>
            <button onClick={close}>close</button>
          </div>
        </Dialog>
    </div>
  )
}