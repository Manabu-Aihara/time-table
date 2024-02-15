import { useCallback, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { InputComponent } from '../organisms/InputTitle';
import { useEventsState } from '../../lib/UseContext';
import { EventItem } from '../../lib/EventItem';
import { useDialog } from '../../hooks/useDialog';
import { AddSlideForm } from '../organisms/InputItem';
import { ItemComponent } from '../molecules/EventItemComponent';

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
  targetEvent: EventItem | undefined;
	onShowDialogView: (targetEvent: EventItem) => void;
}

export const MyCalendar = ({onShowDialogView, targetEvent}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: EventItem }) => {
      console.log(`入ってくるもの: ${JSON.stringify(event)}`);
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();
  const { Dialog, open, close } = useDialog();

  const handleSelectEvent = useCallback((callingEvent: EventItem) => {
    const { title, start, end } = callingEvent;
    console.log(`選んだイベント: ${start}:${end}:${title}`);
    onShowDialogView(callingEvent);
  }, []);

  console.log(`ダイアログ外: ${JSON.stringify(state)}`);
  return (
    <div>
      <button type='button' onClick={open}>Add Event</button>
      <Calendar
        localizer={localizer}
        events={state}
        defaultView='day'
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        selectable
        components={components}
      />
      {targetEvent && <AddSlideForm {...targetEvent} />}
      <Dialog>
        <div>
          <p>入力フォームコンテンツ</p>
          {/* <button type="button" onClick={close}>close</button> */}
          <InputComponent />
        </div>
      </Dialog>
    </div>
  );
}
