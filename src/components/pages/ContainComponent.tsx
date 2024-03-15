import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { useEventsState } from '../../lib/UseContext';
import { TimelineEventProps } from '../../lib/TimelineType';
import { ItemComponent } from '../molecules/EventCardComponent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { topWidth } from '../sprinkles.responsive.css';
import { gridArea } from './ContainComponent.css';
import { MyWeek } from '../organisms/DaysClassComponent';
// import { views } from '../organisms/DaysComponent';

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
  const components = useMemo(() => ({
    event: ({ event }: { event: TimelineEventProps }) => {
      // console.log(`入ってくるもの: ${JSON.stringify(event)}`);
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();

	// const [showModal, setShowModal] = useState(false);

  // ここは後にツールチップで
  // const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
  //   const { title, start, end } = callingEvent;
  //   console.log(`選んだイベント: ${start}:${end}:${title}`);
  //   onShowFormView(callingEvent);
  //   setShowModal(true);
  // }, []);

  console.log(`ダイアログ外: ${JSON.stringify(state)}`);
  return (
    <div>
      <chakra.div className={`${topWidth} ${gridArea}`} flexShrink="0" scrollSnapAlign="start">
        <button>
          <Link to="/timeline">サンプルタイムライン</Link>
        </button>
        <Calendar
          localizer={localizer}
          events={state}
          defaultView='week'
          startAccessor="start"
          endAccessor="end"
          // onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleSelectSlot}
          selectable
          components={components}
          // views={{
          //   month: true,
          //   week: MyWeek
          // }}
        />
      </chakra.div>
    </div>
  );
}
