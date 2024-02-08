import { useCallback, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { InputComponent } from './InputTitle';
import { useEventsState } from '../lib/UseContext';
import { EventItem } from '../lib/EventItem';
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

interface EventProps {
	onShowDialogView: (targetEvent: EventItem) => void;
}


export const MyCalendar = ({onShowDialogView}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: EventItem }) => {
      console.log(`反応します:${JSON.stringify(event)}`);
      return (
        <div>
          {event.title}
        </div>
      );
    }
  }), []);

  const state = useEventsState();

  const { Dialog, open, close } = useDialog();

  const handleSelectEvent = useCallback((callingEvent: EventItem) => {
    // const { title, start, end } = callingEvent;
    // console.log(`${start}:${end}::${title}`);
    onShowDialogView(callingEvent);
  }, [])

  console.log(`ダイアログ外:${JSON.stringify(state)}`);

  return (
    <div>
      <button type="button" onClick={open}>Add Event</button>
      <Calendar
        localizer={localizer}
        events={state}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        selectable
        components={components}
        style={{ height: 500 }}
      />
      <Dialog>
        <div>
          <p>入力フォームコンテンツ</p>
          {/* <button type="button" onClick={close}>close</button> */}
          <InputComponent />
        </div>
      </Dialog>
    </div>
  )
}